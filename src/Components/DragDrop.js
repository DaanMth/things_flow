import React, {useEffect, useReducer, useRef, useState} from 'react';
import Picture from './Picture';
import axios from "axios";
import LeaderLine from 'leader-line-new';
import {useDrop} from 'react-dnd';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows"

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

 function DragDrop() {
    const [board, setBoard] = useState([]);
    const [block, setBlock] = useState([]);
    const [arrows, setArrow] = useState([])
    const [answer, setAnswer] = useState(0);

    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    const addImageToBoard = (id) => {
        const PictureList = pictureList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, PictureList[0]])
    };

    const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id, item.int),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const calculateInt = (halfPictures) => {
        let halfInt = 0;
        halfPictures.map((picture) => {
            halfInt += picture.int
        })
        return halfInt
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

    const ApiCall = () => {
        const half = Math.ceil(board.length / 2);
        const firstHalf = calculateInt(board.slice(0, half));
        const secondHalf = calculateInt(board.slice(half));

        axios.post("http://localhost:9210/collection/stuff", {
                'type': 'run',
                'name': 'multiply',
                'args': [parseInt(firstHalf, 10), parseInt(secondHalf, 10)]
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
                <div className="Pictures">
                    {pictureList.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} int={picture.int}/>
                    })}
                </div>
            </div>

            <div className="Board" ref={drop}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="blocks" direction="horizontal">
                        {(provided) => (
                            <div className="blocks" {...provided.droppableProps} ref={provided.innerRef}>
                                {board.map((picture, index) => {
                                        return(
                                            <Draggable key={picture.id + 1} draggableId={picture.id + 1} index={index}>
                                                {(provided) => (
                                                    <div className="blocks" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Picture  onClick={() => drawLine(picture.id + 1)} /*handleRemoveItem(index)}*/ url={picture.url} id={picture.id + 1}/>
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
                <button className="math" onClick={ApiCall}>Math</button>
                <div className="answerText">
                    {answer}
                </div>
            </div>

        </>
    );
}

export default DragDrop