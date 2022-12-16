import React from 'react'
import Typography from "@mui/material/Typography";

function MailModal({handleClose, modal, setMailValue, saveValue, error}) {

    return <div>
        <div className={"close"} onClick={handleClose}>x</div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={"sidebarModalTitle"}>{modal[0].name}</div>
        </Typography>
        <hr/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            {modal[0].description}
        </Typography>
        <br/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            <h4>current mail:</h4> {modal[0].number}
        </Typography>
        <br/>
        <hr/>
        <input id="description" name='description' type='text'
               onChange={setMailValue}/>
        {error && <div className={"emailError"}>{error}</div>}
        <br/>
        <button className={"componentButton boardModalButton"}
                onClick={saveValue}>Save
        </button>
    </div>


}

export default MailModal