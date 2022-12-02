import React from 'react'
import Typography from "@mui/material/Typography";

function CustomModals({onClick, modal, deleteComponent}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {modal[0].name}
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                {modal[0].description}
            </Typography>
            <br/>
            <button onClick={deleteComponent}
                    className={"deleteButton"}>Remove
            </button>
        </div>
    </div>


}

export default CustomModals