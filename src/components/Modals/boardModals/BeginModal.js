import React from 'react'
import Typography from "@mui/material/Typography";

function BeginModal({onClick, modal, onChange, fileName}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={"sidebarModalTitle"}>{modal[0].name}</div>
        </Typography>
        <hr/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            {modal[0].description}
        </Typography>
        <br/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            <div className={"fileTitle"}>Current file:</div>
            <div className={"fileBox"}>{fileName}</div>
        </Typography>
        <input className={"fileButton"} type="file" id="file" accept=".json" onChange={onChange}/>
        <label className={"fileLabel"} for="file">Add a file</label>
        <br/>
    </div>


}

export default BeginModal