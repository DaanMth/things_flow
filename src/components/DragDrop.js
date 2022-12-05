import React, {useEffect, useState} from 'react';
import Picture from './Picture';
import BeginModal from './Modals/boardModals/BeginModal';
import axios from "axios";
import {useDrop} from 'react-dnd';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Xarrow, {Xwrapper} from "react-xarrows"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useLocation} from "react-router-dom";
import ConvertModal from "./Modals/boardModals/ConvertModal";
import TitleModal from "./Modals/boardModals/TitleModal";
import ChangeTitleModal from "./Modals/boardModals/ChangeTitleModal";
import MailModal from "./Modals/boardModals/MailModal";
import DutyCallsModal from "./Modals/boardModals/DutyCallsModal";
import DefaultModal from "./Modals/boardModals/DefaultModal";
import PremadeModals from "./Modals/sidebarModals/PremadeModals";
import CustomModals from "./Modals/sidebarModals/CustomModals";
import SaveComponentModal from "./Modals/buttonModals/SaveComponentModal";
import SaveListModal from "./Modals/buttonModals/SaveListModal";
import BeginComponent from "./boardComponents/BeginComponent";
import EndComponent from "./boardComponents/EndComponent";
import MiddleComponent from "./boardComponents/MiddleComponent";


const style = {
    position: 'absolute',
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function DragDrop(flowBoard) {
    const [board, setBoard] = useState([]);
    const [block, setBlock] = useState([]);
    const [arrows, setArrow] = useState([]);
    const [sidebar, setSidebar] = useState([]);
    const [modalValue, setModalValue] = useState([]);
    const [middleValue, setMiddleValue] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [mailValue, setMailValue] = useState([]);
    const [savedListName, setSavedListName] = useState([]);
    const [modal, setModal] = useState([{name: 'null', description: 'null'}]);
    const [answer, setAnswer] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openSaveModal, setOpenSaveModal] = React.useState(false);
    const [openSaveList, setOpenSaveList] = React.useState(false);
    const [savedName, setSavedName] = useState("");
    const [savedDescription, setSavedDescription] = useState("");
    const [visibilityAlert, setVisibilityAlert] = React.useState(false);
    const location = useLocation();

    //Open and closes the modals of the components in the board
    const handleOpen = (id) => {
        const addModal = board.filter((picture) => id === picture.id);
        setModal(addModal);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    //Open and closes the modals of the components on the sidebar
    const handleOpenSidebar = (id) => {
        const addModal = sidebar.filter((picture) => id === picture.id);
        setModal(addModal);
        setOpenSidebar(true);
    }
    const handleCloseSidebar = () => setOpenSidebar(false);

    //Open and closes the modals of the components inside the save button
    const handleOpenSavemodal = () => {
        setOpenSaveModal(true);
    }
    const handleCloseSaveModal = () => setOpenSaveModal(false);

    //Open and closes the modals of the components inside the save button
    const handleOpenSaveList = () => {
        setOpenSaveList(true);
    }
    const handleCloseSaveList = () => setOpenSaveList(false);


    //Save the value of the component that is given in the modal
    const saveValue = (id, component) => {
        const boardBlock = board.filter((picture) => id === picture.id);
        if (component === "middleComponent") {
            boardBlock[0].number = middleValue;
        }
        if (component === "dutyCallsComponent") {
            boardBlock[0].number = modalValue;
        }
        if (component === "mailComponent") {
            boardBlock[0].number = mailValue;
        }
        console.log(boardBlock[0]);
    }

    //Adds an image to the board when a component is swiped inside of it
    const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    //Fills the board with the given components from the Flows page
    const generateBoard = (flows) => {
        if (location.state !== null) {
            flows.map((flow) => {
                console.log(flow,)
                let sidebarAdd = sidebar.filter((picture) => flow.functionality === picture.functionality);
                sidebarAdd[0].id = (Math.random() + 1).toString(36).substring(2);
                sidebarAdd[0].number = flow.number;
                setBoard((board) => [...board, sidebarAdd[0]]);
                location.state = null;
            })
        }
    }

    //Remove all the items that are currently on the board
    const emptyBoard = () => {
        setBoard([]);
    }

    //Adds an image to the board when a component is swiped inside of it
    const addImageToBoard = (id) => {
        let sidebarAdd = sidebar.filter((picture) => id === picture.id);
        sidebarAdd[0].id = (Math.random() + 1).toString(36).substring(2);
        console.log(sidebarAdd[0],);
        setBoard((board) => [...board, sidebarAdd[0]]);
    };

    //Gives a success alert when a flow ran successfully
    const alerting = (bool) => {
        setVisibilityAlert(bool);
        if (bool === true) {
            document.getElementById("sidebar").style.height = 'calc(100% - 5vw - 16px)';
        }
        if (bool === false) {
            document.getElementById("sidebar").style.height = 'calc(100% - 3vw - 4px)';
        }
    };

    //lists that are needed before the functions on the board
    let y = structuredClone(board);
    let z = structuredClone(arrows);
    let flowSwitch = false;

    //Calculates the first part of the flow
    const firstCalculation = (x, secondBlock, calculatedAnswer) => {
        if ((secondBlock.functionality.length >= 2 && secondBlock.functionality.length < 5) || (flowSwitch === true)) {
            if (secondBlock.functionality.length === 1) {
                let parsedAnswer = JSON.parse(calculatedAnswer[0]);
                x = [parsedAnswer];
                x.push(secondBlock.functionality[0]);
                secondBlock.functionality.splice(0, 1);
                z.splice(0, 1);
                flowSwitch = false;
                alerting(true);
                runFlow(x);
                return;
            }
            if (secondBlock.functionality.length === 4) {
                console.log(secondBlock.functionality);
                secondBlock.functionality.splice(-1, 1);
                secondBlock.functionality.splice(0, 1);
            }
            x = [y.find(b => b.id === z[0].firstBlock).number];
            x.push(secondBlock.functionality[0]);
            secondBlock.functionality.splice(0, 1);
            flowSwitch = true;
            console.log(x)
            runFlow(x);
        }
    }

    //Calculates the part of the flow when the calculated answer still is null
    const secondCalculation = (x, secondBlock) => {
        x = [y.find(b => b.id === z[0].firstBlock).number];
        x.push(secondBlock);
        z.splice(0, 1);
        runFlow(x);
    }

    //Calculates the part of the flow when the calculated answer is "object"
    const thirdCalculation = (x, secondBlock, calculatedAnswer) => {
        let parsedAnswer = JSON.parse(calculatedAnswer[0]);
        x = [parsedAnswer];
        x.push(secondBlock);
        z.splice(0, 1);
        runFlow(x);
        alerting(true);
    }

    //Runs the functions inside the board
    const calculateBoard = (calculatedAnswer) => {
        console.log(board);
        let x;
        console.log(calculatedAnswer);
        let secondBlock = y.find(b => b.id === z[0].secondBlock)
        console.log(secondBlock, calculatedAnswer);
        if (secondBlock.functionality !== "mail") {
            firstCalculation(x, secondBlock, calculatedAnswer);
        }
        if (calculatedAnswer === null) {
            secondCalculation(x, secondBlock);
        }
        if (calculatedAnswer[1] === "object") {
            thirdCalculation(x, secondBlock, calculatedAnswer);
        } else {
            if (z.length === 0) {
                setAnswer((calculatedAnswer).data);
                console.log(answer,);
                return;
            }
            x = [(calculatedAnswer)];
            x.push(secondBlock);
            z.splice(0, 1);
            runFlow(x);
        }
    };

    //Saves the flow as a component
    const saveFlow = () => {
        let y = structuredClone(board);
        let z = [];
        y.map((component) => (
            z.push(
                {
                    functionality: component.functionality,
                    number: component.number
                }
            )
        ));
        let flow = {
            name: savedName,
            description: savedDescription,
            functionality: z,
            id: (Math.random() + 1).toString(36).substring(2),
            type_id: (Math.random() + 1).toString(36).substring(2),
            url: "./Images/Flow2.png",
            sort: "middleComponent",
            removable: true
        }
        console.log(flow);
        addComponent(flow);
    }

    //Adds an arrow to the page
    const arrowList = (firstBlock, secondBlock) => {
        setArrow((arrow) => [...arrow, {firstBlock, secondBlock}]);
        setBlock([]);
        console.log(arrows,);
    }

    //Adds an arrow to the page
    useEffect(() => {
        if (block.length === 2) {
            arrowList(block[0], block[1]);
        }
    }, [block])

    //Adds an arrow to the page
    const drawLine = (id) => {
        setBlock((block) => [...block, id]);
    }

    //Handles the JSON file when added inside the JSON component
    const handleChange = e => {
        setFileName(e.target.files[0].name);
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            board[0].number = e.target.result;
        };
    };

    //token needed to authorize and run the API calls
    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    //API call for the functionality to add the component to the board
    function addComponent(flow) {
        console.log(flow,);
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'addComponent',
                'args': [flow],

            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => {
                console.log(err);
            })
            .then(res => {
                console.log(res.data);
            })
    }

    //API call for the functionality to delete the component from the board
    function deleteComponent(flow) {
        console.log(flow)
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'deleteComponent',
                'args': [flow.id],

            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => {
                console.log(err);
            })
            .then(res => {
                console.log(res.data);
                handleCloseSidebar()
            })
    }

    //API call to get the components inside the sidebar
    const getSidebarList = () => {
        console.log(flowBoard)
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'getSidebarList'
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setSidebar(res.data);
                generateBoard(location.state);
            })

    }

    //Changes the board component to a list so it can be added to the list page
    const reformFlowToList = () => {
        let y = structuredClone(board);
        let z = [];
        y.map((component) => {
            if (component.number !== undefined) {
                z.push(
                    {
                        functionality: component.functionality,
                        number: component.number
                    }
                )
            } else {
                component.functionality.map((flowComponent) => {
                    if (flowComponent.functionality !== "none") {
                        if (flowComponent.functionality !== "sendDutyCalls") {
                            z.push(
                                {
                                    functionality: flowComponent.functionality,
                                    number: flowComponent.number
                                }
                            )
                        }
                    }
                })
            }

        });
        return {
            flow_id: (Math.random() + 1).toString(36).substring(2),
            name: savedListName,
            components: z,
        };
    }

    //Save a flow as a list
    const saveAsList = () => {
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'saveFlowToList',
                'args': [reformFlowToList()],
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res,)
                handleCloseSaveList();
            })

    }

    //API call that runs all the functionalities of the components on the board
    function runFlow(calculated) {
        console.log(calculated[0], calculated[1].number);
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': calculated[1].functionality,
                'args': [calculated[0], calculated[1].number]
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => {
                console.log(err);
            })
            .then(res => {
                console.log(res.data, "new data");
                if (res.data === "success") {
                    return;
                }
                calculateBoard(res.data);
            })
    }

    //Handles dropping the component in the board when you stop dragging
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(board);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBoard(items);
    }

    return (
        <div className={"dragDrop"}>

            <Box sx={{width: '100%'}}>
                <Collapse in={visibilityAlert}>
                    <Alert severity="success" onClose={() => alerting(false)} sx={{height: '2vw'}}>
                        The flow ran successfully!!
                    </Alert>
                </Collapse>
            </Box>

            <div className="sidebar" id="sidebar">
                {getSidebarList()}
                <div className="Pictures">
                    <div>
                        <div className={"sidebarTitle"}>Start Component</div>
                        {sidebar.map((picture) => {
                            if (picture.sort === 'beginComponent') {
                                return (
                                    <Picture url={picture.url} id={picture.id} type_id={picture.type_id}
                                             onClick={() => handleOpenSidebar(picture.id)}/>
                                )
                            }
                            return null
                        })}
                    </div>
                    <div>
                        <div className={"sidebarTitle"}>Middle Component</div>
                        {sidebar.map((picture) => {
                            if (picture.sort === 'middleComponent') {
                                return (
                                    <Picture url={picture.url} id={picture.id} type_id={picture.type_id}
                                             onClick={() => handleOpenSidebar(picture.id)}/>
                                )
                            }
                            return null
                        })}
                    </div>
                    <div>
                        <div className={"sidebarTitle"}>End Component</div>
                        {sidebar.map((picture) => {
                            if (picture.sort === 'endComponent') {
                                return (
                                    <Picture url={picture.url} id={picture.id} type_id={picture.type_id}
                                             onClick={() => handleOpenSidebar(picture.id)}/>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
            </div>

            <div className="Board" ref={drop}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="blocks" direction="horizontal">
                        {(provided) => (
                            <div className="blocks" {...provided.droppableProps} ref={provided.innerRef}>
                                {board.map((picture, index) => {
                                    if (picture.sort === "beginComponent") {
                                        return (
                                            <BeginComponent drawLine={() => drawLine(picture.id)} picture={picture}
                                                            handleOpen={() => handleOpen(picture.id)} index={index}/>
                                        )
                                    }
                                    if (picture.sort === "endComponent") {
                                        return (
                                            <EndComponent drawLine={() => drawLine(picture.id)} picture={picture}
                                                          handleOpen={() => handleOpen(picture.id)} index={index}/>
                                        )
                                    } else {
                                        return (
                                            <MiddleComponent drawLine={() => drawLine(picture.id)} picture={picture}
                                                             handleOpen={() => handleOpen(picture.id)} index={index}/>
                                        )
                                    }
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {(() => {
                        if (modal[0].sort === "beginComponent") {
                            return (
                                <BeginModal onClick={handleClose} onChange={handleChange} modal={modal}
                                            fileName={fileName}/>
                            )
                        }
                        if (modal[0].name === "Convert") {
                            return (
                                <ConvertModal onClick={handleClose} modal={modal}
                                              saveValue={() => saveValue(modal[0].id, "middleComponent")}
                                              middleValue={middleValue}/>
                            )
                        }
                        if (modal[0].name === "Title") {
                            return (
                                <TitleModal onClick={handleClose}
                                            modal={modal}
                                            onChange={event => setMiddleValue(event.target.value)}
                                            saveValue={() => saveValue(modal[0].id, "middleComponent")}/>

                            )
                        }
                        if (modal[0].name === "Change Title") {
                            return (
                                <ChangeTitleModal modal={modal} handleClose={handleClose}/>
                            )

                        }
                        if (modal[0].name === "Mail") {
                            return (
                                <MailModal modal={modal} handleClose={handleClose}
                                           setMailValue={event => setMailValue(event.target.value)}
                                           saveValue={() => saveValue(modal[0].id, "mailComponent")}/>

                            )
                        }
                        if (modal[0].name === "DutyCalls") {
                            return (
                                <DutyCallsModal modal={modal} handleClose={handleClose}
                                                setModalValue={event => setModalValue(event.target.value)}
                                                modalValue={modalValue}
                                                saveValue={() => saveValue(modal[0].id, "dutyCallsComponent")}/>
                            )
                        } else {
                            return (
                                <DefaultModal modal={modal} saveValue={() => saveValue(modal[0].id)}
                                              setModalValue={event => setModalValue(event.target.value)}/>
                            )
                        }
                    })()}
                </Box>
            </Modal>

            <Modal
                open={openSidebar}
                onClose={handleCloseSidebar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {(() => {
                        if (modal[0].removable === true) {
                            return (
                                <CustomModals onClick={handleCloseSidebar} modal={modal}
                                              deleteComponent={() => deleteComponent(modal[0])}/>
                            )
                        } else {
                            return (
                                <PremadeModals modal={modal} onClick={handleCloseSidebar}/>
                            )
                        }
                    })()}
                </Box>
            </Modal>

            <Modal
                open={openSaveModal}
                onClose={handleCloseSaveModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SaveComponentModal onClick={handleCloseSaveModal} saveFlow={() => saveFlow()}
                                        setSavedDescription={event => setSavedDescription(event.target.value)}
                                        setSavedName={event => setSavedName(event.target.value)}/>
                </Box>
            </Modal>

            <Modal
                open={openSaveList}
                onClose={handleCloseSaveList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SaveListModal onClick={handleCloseSaveList} saveAsList={() => saveAsList()}
                                   setSavedListName={event => setSavedListName(event.target.value)}/>
                </Box>
            </Modal>


            <div className="drawArrow">
                {
                    arrows.map((arrow) => {
                        return (
                            <Xwrapper>
                                <Xarrow start={arrow.firstBlock} end={arrow.secondBlock}/>
                            </Xwrapper>
                        );
                    })}
            </div>

            <div className="submit">
                <button className="math" onClick={() => calculateBoard(null)}><img className={"buttonImages"}
                                                                                   src="./Images/run.png"
                                                                                   alt="Italian Trulli"/></button>
            </div>
            <div className="submit">
                <button className="math saveButton" onClick={() => handleOpenSavemodal()}><img
                    className={"buttonImages"} src="./Images/save.png" alt="Italian Trulli"/></button>
            </div>
            <div className="submit">
                <button className="math saveToListButton" onClick={() => handleOpenSaveList()}><img
                    className={"buttonImages"} src="./Images/saveToList.png" alt="Italian Trulli"/></button>
            </div>
            <div className="submit">
                <button className="math removeButton" onClick={() => emptyBoard()}><img className={"buttonImages"}
                                                                                        src="./Images/remove.png"
                                                                                        alt="Italian Trulli"/></button>
            </div>
        </div>


    );

}

export default DragDrop