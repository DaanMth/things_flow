import React, {useState} from 'react';
import Picture from './Picture';
import axios from "axios";
import {useDrop} from 'react-dnd';

const pictureList = [
    {
        id: 1,
        url: './Images/ApiCall.png',
        int: 1,
    },
    {
        id: 2,
        url: './Images/designsFigma.png',
        int: 2,
    },
    {
        id: 3,
        url: './Images/designsFigma2.png',
        int: 3,
    },
    {
        id: 4,
        url: './Images/DesignFigma3.png',
        int: 4,
    },
    {
        id: 5,
        url: './Images/DutyCalls.png',
        int: 5,
    },
    {
        id: 6,
        url: './Images/Naamloos.png',
        int: 6,
    },
    {
        id: 7,
        url: './Images/SendMail.png',
        int: 7,
    },
    {
        id: 8,
        url: './Images/SetHeader.png',
        int: 8,
    },
    {
        id: 9,
        url: './Images/SetHeaders.png',
        int: 9,
    },
    {
        id: 10,
        url: './Images/SwitchCase.png',
        int: 10,
    },
]

function DragDrop() {
    const [board, setBoard] = useState([]);
    const [answer, setAnswer] = useState(0);

    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    const addImageToBoard = (id, int) => {
        const PictureList = pictureList.filter((picture) => id == picture.id);
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


    const ApiCall = () => {
        const firstNumber = board[0].int
        const secondNumber = board[1].int
        axios.post("http://localhost:9210/collection/stuff", {
                'type': 'run',
                'name': 'multiply',
                'args': [parseInt(firstNumber, 10), parseInt(secondNumber, 10)]
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

    return (
        <>
            <div className="sidebar">
                <div className="Pictures">
                    {pictureList.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} int={picture.int}/>
                    })}
                </div>
            </div>


            <div className="Board" ref={drop}>
                {board.map((picture, index) => {
                    return <Picture onClick={() => handleRemoveItem(index)} url={picture.url} id={picture.id}/>
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