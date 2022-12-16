import React from 'react'
import Typography from "@mui/material/Typography";

function TitleModal({onClick, modal, saveValue, onChange}) {


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
            <h4>current value:</h4>{modal[0].number}
        </Typography>
        <br/>
        <hr/>
        <br/>
        <input id="description" name='description' type='text'
               onChange={onChange}/>
        <br/>
        <button className="componentButton boardModalButton"
                onClick={saveValue}>Save
        </button>
    </div>


}

export default TitleModal