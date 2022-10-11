import React, {useEffect, useReducer, useRef, useState} from 'react';
import Picture from './Picture';
import axios from "axios";
import LeaderLine from 'leader-line-new';
import {useDrop} from 'react-dnd';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const pictureList = [
    {
        id: '100',
        url: './Images/ApiCall.png',
        int: 1,
    },
    {
        id: '200',
        url: './Images/designsFigma.png',
        int: 2,
    },
    {
        id: '300',
        url: './Images/designsFigma2.png',
        int: 3,
    },
    {
        id: '400',
        url: './Images/DesignFigma3.png',
        int: 4,
    },
    {
        id: '500',
        url: './Images/DutyCalls.png',
        int: 5,
    },
    {
        id: '600',
        url: './Images/Naamloos.png',
        int: 6,
    },
    {
        id: '700',
        url: './Images/SendMail.png',
        int: 7,
    },
    {
        id: '800',
        url: './Images/SetHeader.png',
        int: 8,
    },
    {
        id: '900',
        url: './Images/SetHeaders.png',
        int: 9,
    },
    {
        id: '1000',
        url: './Images/SwitchCase.png',
        int: 10,
    },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

 function DragDrop() {
    const [board, setBoard] = useState([]);
    const [block, setBlock] = useState([]);
    const [arrows, setArrow] = useState([]);
    const [sidebar, setSidebar] = useState([]);
    const [modalValue, setmodalValue] = useState([]);
    const [calculateValue, setCalculateValue] = useState([]);
    const [componentDescription, setDescription] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [modal, setModal] = useState([{name: 'null', description: 'null'}]);
    const [answer, setAnswer] = useState(0);
     const [open, setOpen] = React.useState(false);

     const handleOpen = (id) => {
         const addModal = board.filter((picture) => id === picture.id);
         setModal(addModal);
         setOpen(true);
     }
     const handleClose = () => setOpen(false);

     const saveValue = (id) => {
         const boardBlock = board.filter((picture) => id === picture.id);
         boardBlock[0].number = modalValue;
         console.log(boardBlock);
     }

    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

     const [{isOver}, drop] = useDrop(() => ({
         accept: "image",
         drop: (item) => addImageToBoard(item.id),
         collect: (monitor) => ({
             isOver: !!monitor.isOver(),
         })
     }));

    const addImageToBoard = (id) => {
        let r = (Math.random() + 1).toString(36).substring(7);
        console.log(r);
        const sidebarAdd = sidebar.filter((picture) => id === picture.id);
        sidebarAdd[0].id = r;
        console.log(sidebarAdd[0].id);
        setBoard((board) => [...board, sidebarAdd[0]])
    };

    let calculate = [];

    const calculateBoard = () => {
        board.map((block) => {
            console.log(block);
           if(block.name === "first value"){
               calculate.push(block.number);
            }
            else{
               calculate.push(block);
            }
            if(calculate.length === 2){
               ApiCall(calculate);
               calculate = [answer];
            }

        })
    }

    const arrowList = (firstBlock, secondBlock) =>{
        setArrow((arrow) =>[...arrow, {firstBlock, secondBlock}]);
        setBlock( []);
        console.log(arrows);
     }

    useEffect(() => {
        if(block.length === 2)
        {
            arrowList(block[0], block[1]);
        }
    }, [block])

     const drawLine = (id) => {
         setBlock((block) =>[...block, id]);
     }

     const getSidebarList = () => {
         axios.post("http://localhost:9210/collection/stuff", {
                 'type': 'run',
                 'name': 'getSidebarComponentList',
                 'args': []
             },
             {
                 headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                 }
             })
             .then(res => {
                 setSidebar(res.data);
             })
     }

     const ApiCall = (calculate) => {

        axios.post("http://localhost:9210/collection/stuff", {
                'type': 'run',
                'name': calculate[1].functionality,
                'args': [parseInt(calculate[0]), parseInt(calculate[1].number)]
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setAnswer(res.data);
            })
    }

     const newComponent = () => {
         axios.post("http://localhost:9210/collection/stuff", {
                 'type': 'run',
                 "name": "add_component",
                 "args": [firstName, componentDescription]
             },
             {
                 headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                 }
             })
             .then(res => {
                 console.log(res.data);
             })
     }

     function handleOnDragEnd(result) {
         if (!result.destination) return;

         const items = Array.from(board);
         const [reorderedItem] = items.splice(result.source.index, 1);
         items.splice(result.destination.index, 0, reorderedItem);

         setBoard(items);
     }

    return (

        <>


            <div className="header">
                <row>
                    <div className='column'>
                        <img className='logo' src='./Images/thingsLogo.png' alt="Paris"/>
                    </div>
                    <div className='column'>
                        <div className='texts'>
                            <div className='column2'>
                                <div className="text">Documentation</div>
                            </div>
                            <div className='column2'>
                                <div className="text">Playground</div>
                            </div>
                            <div className='column2'>
                                <div className="text">Flows</div>
                            </div>

                        </div>
                    </div>
                </row>
            </div>

            <div className="sidebar">
                {getSidebarList()}
                <div className="Pictures">
                    {sidebar.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} type_id={picture.type_id}/>
                    })}
                </div>
                    <div className="addComponent">
                        <div>
                            <div className="text">Add a Component</div>
                            <div>Name</div>
                            <input id="name" name='name' type='text' onChange={event => setFirstName(event.target.value)} value={firstName}/>
                            <div>Description</div>
                            <input id="description" name='description' type='text' onChange={event => setDescription(event.target.value)} value={componentDescription}/>
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
                                    return(
                                        <Draggable key={picture.id} draggableId={picture.id} index={index}>
                                            {(provided) => (
                                                <div className="blocks" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <Picture url={picture.url} onClick={() => handleOpen(picture.id)} id={picture.id}/>
                                                    <div className="connect" onClick={() => drawLine(picture.id)}/>
                                                    <div className="error">error</div>
                                                </div>

                                            )}

                                        </Draggable>
                                    );
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modal[0].name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modal[0].description}
                    </Typography>
                    <br/>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        current value: <h4>{modal[0].number}</h4>
                    </Typography>
                    <div>
                        <br/>
                        <h4>Value:</h4>
                        <input className="value" id="description" name='description' type='number' onChange={event => setmodalValue(event.target.value)}/>
                        <button className="componentButton" onClick={() => saveValue(modal[0].id)}>{modal[0].name} the values</button>
                    </div>
                </Box>
            </Modal>

            <div>
                {
                    arrows.map((arrow) => {
                        return(
                            <Xwrapper>
                                <Xarrow start={arrow.firstBlock} end={arrow.secondBlock}/>
                            </Xwrapper>
                        );
                })}
            </div>

            <div className="submit">
                <button className="math" onClick={calculateBoard}>Math</button>
                <div className="answerText">
                    {answer}
                </div>
            </div>

        </>


    );

}

export default DragDrop