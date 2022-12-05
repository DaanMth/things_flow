import React from 'react'
import Typography from "@mui/material/Typography";

function BeginModal({onClick, modal, onChange, fileName}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal[0].name}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            {modal[0].description}
        </Typography>
        <br/>
        <hr/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            <div className={"fileTitle"}>Current file:</div>
            <div className={"fileBox"}>{fileName}</div>
        </Typography>

        <br/>
        <label htmlFor="file">Upload a file</label>
        <br/>
        <input type="file" id="file" accept=".json" onChange={onChange}/>
        <br/>
    </div>


}

export default BeginModal