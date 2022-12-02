import React from 'react'
import {useDrag} from 'react-dnd';

function Picture({id, url, type_id, onClick}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id: id, type_id: type_id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return <img
        id={id}
        ref={drag}
        src={url}
        width="100px"
        height="100px"
        role="button"
        onClick={onClick}
        tabIndex="0"
    />;

}

export default Picture