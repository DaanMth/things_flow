import React from 'react'

function FlowListComponent({flow, navigate, handleOpenSaveModal}) {

    return <div className={"flow"}>
        <ul>
            <li className={"flowTitle"}>{flow.flowName}</li>
            <li className={"flowErrors"}>0|0</li>
            <li>13;45;82;115</li>
            <li><div className={"flowListButton"}
                   onClick={navigate}>go to flow</div></li>
            <li className={"favorite"}>⭐</li>
            <div className={"removeFlow"} onClick={handleOpenSaveModal}>x</div>
        </ul>
    </div>


}

export default FlowListComponent