import React from 'react'
import Typography from "@mui/material/Typography";

function ConvertModal({onClick, modal, saveValue, middleValue}) {

    return  <div>
        <div className={"close"} onClick={onClick}>x</div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal[0].name}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            {modal[0].description}
        </Typography>
        <br/>
        <hr/>
        <h4>From:</h4>
        <select value={middleValue[0]} id="channels" name="channels"
                onChange={event => middleValue.splice(0, 1, event.target.value)}>
            <option>Select an option..</option>
            <option value="JSON">JSON</option>
        </select>
        <h4>To:</h4>
        <select value={middleValue[1]} id="channels" name="channels"
                onChange={event => middleValue.splice(1, 1, event.target.value)}>
            <option>Select an option..</option>
            <option value="DutyCalls">DutyCalls</option>
        </select>
        <button className="componentButton"
                onClick={saveValue}>Save
        </button>
    </div>


}

export default ConvertModal