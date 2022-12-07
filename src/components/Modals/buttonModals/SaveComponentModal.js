import React from 'react'
import Typography from "@mui/material/Typography";

function SaveComponentModal({onClick, setSavedName, setSavedDescription, saveFlow}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className={"saveModalTitle"}>Save flow as component</div>
                <hr/>
            </Typography>
            <Typography  id="modal-modal-title" variant="h6" component="h2">
                <div>Name:</div>
                <input id="description" name='description' type='text'
                       onChange={setSavedName}/>
                <br/>
                <br/>
                <div>Description:</div>
                <input id="description" name='description' type='text'
                       onChange={setSavedDescription}/>
                <br/>
            </Typography>
            <br/>
            <button className="math" onClick={saveFlow}>Save</button>
        </div>
    </div>


}

export default SaveComponentModal