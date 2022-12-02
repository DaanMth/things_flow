import React from 'react'
import Typography from "@mui/material/Typography";

function DeleteModal({handleCloseSaveModal, removeFlow}) {

    return <div>
        <div className={"close"} onClick={handleCloseSaveModal}>x</div>
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className={"Title"}>Delete</div>
                <div>Are you sure you want to delete this flow?</div>
                <hr/>
            </Typography>
            <br/>
            <button className="deleteButton" onClick={removeFlow}>Delete</button>
        </div>
    </div>


}

export default DeleteModal