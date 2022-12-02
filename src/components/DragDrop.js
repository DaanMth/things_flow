import React, {useEffect, useState} from 'react';
import Picture from './Picture';
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
    const [modalValue, setmodalValue] = useState([]);
    const [middleValue, setMiddleValue] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [componentDescription, setDescription] = useState([]);
    const [mailValue, setMailValue] = useState([]);
    const [savedListName, setSavedListName] = useState([]);
    const [firstName, setFirstName] = useState('');
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

    const generateBoard = (flows) => {
        if(location.state !== null){
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

    //Runs the functions inside the board
    const calculateBoard = (calculatedAnswer) => {
        console.log(board);
        let x;
        console.log(calculatedAnswer,);
        let secondBlock = y.find(b => b.id === z[0].secondBlock)
        console.log(secondBlock, calculatedAnswer);
        if(secondBlock.functionality !== "mail") {
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
                return;
            }
        }
        if (calculatedAnswer === null) {
            x = [y.find(b => b.id === z[0].firstBlock).number];
            x.push(secondBlock);
            z.splice(0, 1);
            runFlow(x);
        }
        if (calculatedAnswer[1] === "object") {
            let parsedAnswer = JSON.parse(calculatedAnswer[0]);
            x = [parsedAnswer];
            x.push(secondBlock);
            z.splice(0, 1);
            runFlow(x);
            alerting(true);
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

    //Save a flow as a list
    const saveAsList = () => {
        let y = structuredClone(board);
        let z = [];
        y.map((component) => {
            if(component.number !== undefined){
                z.push(
                    {
                        functionality: component.functionality,
                        number: component.number
                    }
                )
            }
            else{
                component.functionality.map((flowComponent) =>
                {
                    if(flowComponent.functionality !== "none"){
                        if(flowComponent.functionality !== "sendDutyCalls"){
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
        let flow = {
            flow_id: (Math.random() + 1).toString(36).substring(2),
            name: savedListName,
            components: z,
        }
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'saveFlowToList',
                'args': [flow],
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
                if(res.data === "success"){
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

                <div className="addComponent">
                    <div>
                        <div className="text">Add a Component</div>
                        <div>Name</div>
                        <input id="name" name='name' type='text' onChange={event => setFirstName(event.target.value)}
                               value={firstName}/>
                        <div>Description</div>
                        <input id="description" name='description' type='text'
                               onChange={event => setDescription(event.target.value)} value={componentDescription}/>
                    </div>
                    <button className="componentButton" /*onClick={newComponent}*/>Add Component</button>
                </div>
            </div>

            <div className="Board" ref={drop}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="blocks" direction="horizontal">
                        {(provided) => (
                            <div className="blocks" {...provided.droppableProps} ref={provided.innerRef}>
                                {board.map((picture, index) => {
                                    if(picture.sort === "beginComponent"){
                                        return(
                                        <Draggable key={picture.id} draggableId={picture.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="blocks" {...provided.draggableProps} {...provided.dragHandleProps}
                                                    ref={provided.innerRef}>
                                                    <Picture url={picture.url} onClick={() => handleOpen(picture.id)}
                                                             id={picture.id}/>
                                                    <div className="connect" onClick={() => drawLine(picture.id)}><div className={"outputText"}>O</div></div>
                                                    <div className="error" >+</div>
                                                </div>

                                            )}
                                        </Draggable>

                                        )}
                                    if(picture.sort === "endComponent"){
                                        return(
                                            <Draggable key={picture.id} draggableId={picture.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="blocks" {...provided.draggableProps} {...provided.dragHandleProps}
                                                        ref={provided.innerRef}>
                                                        <Picture url={picture.url} onClick={() => handleOpen(picture.id)}
                                                                 id={picture.id}/>
                                                        <div className="arrowConnect" onClick={() => drawLine(picture.id)}><div className={"inputText"}>I</div></div>
                                                        <div className="error" >+</div>
                                                    </div>

                                                )}
                                            </Draggable>
                                        )}
                                    else {
                                        return (
                                            <Draggable key={picture.id} draggableId={picture.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="blocks" {...provided.draggableProps} {...provided.dragHandleProps}
                                                        ref={provided.innerRef}>
                                                        <Picture url={picture.url}
                                                                 onClick={() => handleOpen(picture.id)}
                                                                 id={picture.id}/>
                                                        <div className="connect" onClick={() => drawLine(picture.id)}>
                                                            <div className={"outputText"}>O</div>
                                                        </div>
                                                        <div className="arrowConnect"
                                                             onClick={() => drawLine(picture.id)}>
                                                            <div className={"inputText"}>I</div>
                                                        </div>
                                                        <div className="error">+</div>
                                                    </div>

                                                )}
                                            </Draggable>
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
                                <div>
                                    <div className={"close"} onClick={handleClose}>x</div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                    <hr/>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        <div className={"fileTitle"}>Current file:</div>
                                        <div className={"fileBox"}>{fileName}</div>
                                    </Typography>

                                    <br/>
                                    <label htmlFor="file">Upload a file</label>
                                    <br/>
                                    <input type="file" id="file" accept=".json" onChange={handleChange}/>
                                    <br/>
                                </div>
                            )
                        }
                        if (modal[0].name === "Convert") {
                            return (
                                <div>
                                    <div className={"close"} onClick={handleClose}>x</div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                    <hr/>
                                    <h4>From:</h4>
                                    <select value={middleValue[0]} id="channels" name="channels"
                                            onChange={event => middleValue.splice(0, 1, event.target.value)}>
                                        <option>Select an option..</option>
                                        <option value="JSON">JSON</option>
                                    </select>
                                    <h4>To:</h4>
                                    <select value={middleValue[1]} id="channels" name="channels"
                                            onChange={event => middleValue.splice(1, 1, event.target.value)}>
                                        <option>Select an option..</option>
                                        <option value="DutyCalls">DutyCalls</option>
                                    </select>
                                    <button className="componentButton"
                                            onClick={() => saveValue(modal[0].id, "middleComponent")}>Save
                                    </button>
                                </div>
                            )
                        }
                        if (modal[0].name === "Title") {
                            return (
                                <div>
                                    <div className={"close"} onClick={handleClose}>x</div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                    <hr/>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        current value: <h4>{modal[0].number}</h4>
                                    </Typography>
                                    <br/>
                                    <input id="description" name='description' type='text'
                                           onChange={event => setMiddleValue(event.target.value)}/>
                                    <br/>
                                    <button className="componentButton"
                                            onClick={() => saveValue(modal[0].id, "middleComponent")}>Save
                                    </button>
                                </div>
                            )
                        }
                        if (modal[0].name === "Change Title") {
                            return (
                                <div>
                                    <div className={"close"} onClick={handleClose}>x</div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                </div>
                            )
                        }
                        if (modal[0].name === "Mail") {
                            return (
                                <div>
                                    <div className={"close"} onClick={handleClose}>x</div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                    <hr/>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        current mail: <h4>{modal[0].number}</h4>
                                    </Typography>
                                    <br/>
                                    <input id="description" name='description' type='text'
                                           onChange={event => setMailValue(event.target.value)}/>
                                    <br/>
                                    <button className="componentButton"
                                            onClick={() => saveValue(modal[0].id, "mailComponent")}>Save
                                    </button>
                                </div>
                            )
                        }
                        if (modal[0].name === "DutyCalls") {
                            return (
                                <div>
                                    <div className={"close"} onClick={handleClose}>x</div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                    <hr/>
                                    <h4>Channels:</h4>
                                    <select value={modalValue} id="channels" name="channels"
                                            onChange={event => setmodalValue(event.target.value)}>
                                        <option value="None">Choose an option...</option>
                                        <option value="privateChannel">Private Channel</option>
                                        <option value="ThingsFlow">ThingsFlow</option>
                                    </select>
                                    <button className="componentButton"
                                            onClick={() => saveValue(modal[0].id, "dutyCallsComponent")}>Save
                                    </button>
                                </div>
                            )
                        }else {
                            return (
                                <div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modal[0].name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {modal[0].description}
                                    </Typography>
                                    <br/>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        current value: <h4>{modal[0].number}</h4>
                                    </Typography>
                                    <div>
                                        <br/>
                                        <h4>Value:</h4>
                                        <input className="value" id="description" name='description' type='number'
                                               onChange={event => setmodalValue(event.target.value)}/>
                                        <button className="componentButton"
                                                onClick={() => saveValue(modal[0].id)}>Save
                                        </button>
                                    </div>
                                </div>
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
                        if(modal[0].removable === true){
                            return(
                                <div>
                                    <div className={"close"} onClick={handleCloseSidebar}>x</div>
                                    <div>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {modal[0].name}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                                            {modal[0].description}
                                        </Typography>
                                        <br/>
                                        <button onClick={() => deleteComponent(modal[0])} className={"deleteButton"}>Remove</button>
                                    </div>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div>
                                    <div className={"close"} onClick={handleCloseSidebar}>x</div>
                                    <div>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {modal[0].name}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                                            {modal[0].description}
                                        </Typography>
                                        <br/>
                                    </div>
                                </div>
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
                    <div className={"close"} onClick={handleCloseSaveModal}>x</div>
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h4>Save flow as component</h4>
                            <hr/>
                            <h4>Name:</h4>
                            <input id="description" name='description' type='text'
                                   onChange={event => setSavedName(event.target.value)}/>
                            <br/>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <br/>
                            <h4>Description:</h4>
                            <input id="description" name='description' type='text'
                                   onChange={event => setSavedDescription(event.target.value)}/>
                            <br/>
                        </Typography>
                        <br/>
                        <button className="math" onClick={() => saveFlow()}>Save</button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openSaveList}
                onClose={handleCloseSaveList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={"close"} onClick={handleCloseSaveList}>x</div>
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h4>Save flow as list</h4>
                            <hr/>
                            <h4>Name:</h4>
                            <input id="description" name='description' type='text' maxlength='25'
                                   onChange={event => setSavedListName(event.target.value)}/>
                            <br/>
                        </Typography>
                        <br/>
                        <button className="math" onClick={() => saveAsList()}>Save</button>
                    </div>
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
                <button className="math" onClick={() => calculateBoard(null)}><img className={"buttonImages"} src="./Images/run.png" alt="Italian Trulli"/></button>
            </div>
            <div className="submit">
                <button className="math saveButton" onClick={() => handleOpenSavemodal()}><img className={"buttonImages"} src="./Images/save.png" alt="Italian Trulli"/></button>
            </div>
            <div className="submit">
                <button className="math saveToListButton" onClick={() => handleOpenSaveList()}><img className={"buttonImages"} src="./Images/saveToList.png" alt="Italian Trulli"/></button>
            </div>
            <div className="submit">
                <button className="math removeButton" onClick={() => emptyBoard()}><img className={"buttonImages"} src="./Images/remove.png" alt="Italian Trulli"/></button>
            </div>
        </div>


    );

}

export default DragDrop