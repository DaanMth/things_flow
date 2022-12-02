import React from 'react'
import Typography from "@mui/material/Typography";

function ChangeTitleModal({modal, setModalValue, saveValue}) {

    return <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal[0].name}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            {modal[0].description}
        </Typography>
        <br/>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            current value: <h4>{modal[0].number}</h4>
        </Typography>
        <div>
            <br/>
            <h4>Value:</h4>
            <input className="value" id="description" name='description' type='number'
                   onChange={event => setModalValue(event.target.value)}/>
            <button className="componentButton"
                    onClick={() => saveValue(modal[0].id)}>Save
            </button>
        </div>
    </div>


}

export default ChangeTitleModal