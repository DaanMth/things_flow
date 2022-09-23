import React from 'react'
import {useDrag} from 'react-dnd';

function Picture({id, url, int,onClick}){
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id: id,int: int},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))



    return <img
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