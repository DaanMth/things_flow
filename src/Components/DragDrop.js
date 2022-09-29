import React, {useEffect, useRef, useState} from 'react';
import Picture from './Picture';
import axios from "axios";
import LeaderLine from 'leader-line-new';
import {useDrop} from 'react-dnd';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

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
    const [answer, setAnswer] = useState(0);
    const [indexList, setIndex] = useState([])


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

    const handleRemoveItem = (index) => {
        board.splice(index, 1)
        setBoard((board) => [...board]);
    }

    const calculateInt = (halfPictures) => {
        let halfInt = 0;
        halfPictures.map((picture) => {
            halfInt += picture.int
        })
        return halfInt
    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const drawLine = (index) => {
        if (index > 0) {
            new LeaderLine(
                document.getElementById(index - 1),
                document.getElementById(index),
                {
                    endPlug: "behind" ,
                    startPlug: "behind",
                    color: '#618FCA',
                    size: 9,
                    default: 'fluid'
                },
            );

        }

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
                                <h2>Documentation</h2>
                            </div>
                            <div className='column2'>
                                <h2>Playground</h2>
                            </div>
                            <div className='column2'>
                                <h2>Flows</h2>
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
                                        <Draggable key={picture.id} draggableId={picture.id} index={index}>
                                            {(provided) => (
                                                <div className="blocks" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <Picture  /*onClick={() => drawLine(index)} /*handleRemoveItem(index)}*/ url={picture.url} id={picture.id}/>
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