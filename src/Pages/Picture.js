import React from 'react'
import {useDrag} from 'react-dnd';

function Picture({id, url, type_id, onClick}) {
    // eslint-disable-next-line
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id: id, type_id: type_id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return <img
        className={"sidebarPictures"}
        id={id}
        ref={drag}
        alt={""}
        src={url}
        width="100px"
        height="100px"
        role="button"
        onClick={onClick}
        tabIndex="0"
    />;

}

export default Picture