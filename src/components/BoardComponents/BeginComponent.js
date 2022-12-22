import React from 'react'
import {Draggable} from "react-beautiful-dnd";
import Picture from "../../Pages/Picture";

function BeginComponent({picture, handleOpen, drawLine, index, errorHandling, errorState}) {

    return <Draggable key={picture.id} draggableId={picture.id} index={index}>
        {(provided) => (
            <div
                className="blocks" {...provided.draggableProps} {...provided.dragHandleProps}
                ref={provided.innerRef}>
                <Picture url={picture.url}
                         onClick={handleOpen}
                         id={picture.id}/>
                <div className="connect" onClick={drawLine}>
                    <div className={"outputText"}>O</div>
                </div>
                <div className={errorState[0]} onClick={errorHandling}>{errorState[1]}</div>
            </div>

        )}
    </Draggable>


}

export default BeginComponent