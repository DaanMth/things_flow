import React from 'react'
import Typography from "@mui/material/Typography";

function DutyCallsModal({handleClose, modal, modalValue, setModalValue, saveValue}) {

    return <div>
        <div className={"close"} onClick={handleClose}>x</div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal[0].name}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            {modal[0].description}
        </Typography>
        <br/>
        <hr/>
        <h4>Channels:</h4>
        <select value={modalValue} id="channels" name="channels"
                onChange={setModalValue}>
            <option value="None">Choose an option...</option>
            <option value="privateChannel">Private Channel</option>
            <option value="ThingsFlow">ThingsFlow</option>
        </select>
        <button className="componentButton"
                onClick={() => saveValue(modal[0].id, "dutyCallsComponent")}>Save
        </button>
    </div>


}

export default DutyCallsModal