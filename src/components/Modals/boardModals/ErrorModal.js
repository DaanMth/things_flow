import React from 'react'
import Typography from "@mui/material/Typography";

function ErrorModal({onClick, changeErrorState}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={"sidebarModalTitle"}>Add Configuration</div>
        </Typography>
        <hr/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            <h4>Select configuration:</h4>
            <select className={"selectBar"} id="channels" name="channels">
                <option>Select an option..</option>
                <option value="JSON">DutyCalls</option>
                <option value="JSON">Mail</option>
                <option value="JSON">Logging</option>
            </select>
        </Typography>
        <br/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            <button className={"componentButton boardModalButton"} onClick={changeErrorState}>Save</button>
        </Typography>
        <br/>
    </div>


}

export default ErrorModal