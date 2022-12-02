import React from 'react'
import {Draggable} from "react-beautiful-dnd";
import Picture from "../Picture";

function BeginComponent({picture, handleOpen, drawLine, index}) {

    return <Draggable key={picture.id} draggableId={picture.id} index={index}>
        {(provided) => (
            <div
                className="blocks" {...provided.draggableProps} {...provided.dragHandleProps}
                ref={provided.innerRef}>
                <Picture url={picture.url}
                         onClick={handleOpen}
                         id={picture.id}/>
                <div className="arrowConnect"
                     onClick={() => drawLine(picture.id)}>
                    <div className={"inputText"}>I</div>
                </div>
                <div className="error">+</div>
            </div>

        )}
    </Draggable>


}

export default BeginComponent