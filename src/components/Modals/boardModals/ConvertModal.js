import React from 'react'
import Typography from "@mui/material/Typography";

function ConvertModal({onClick, modal, saveValue, middleValue}) {

    //used to get the 2 values in the modal immediately
    const getNumber = () => {
        if (modal[0].number === undefined) {
            modal[0].number = ["empty", "empty"];
        }
    }

    return <div>
        {getNumber()}
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
            <h4>current value:</h4>{modal[0].number[0]} -> {modal[0].number[1]}
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
            <option value="DutyCalls">Object</option>
        </select>
        <button className="componentButton boardModalButton"
                onClick={saveValue}>Save
        </button>
    </div>


}

export default ConvertModal