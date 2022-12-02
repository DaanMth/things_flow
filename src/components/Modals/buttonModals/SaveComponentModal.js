import React from 'react'
import Typography from "@mui/material/Typography";

function SaveComponentModal({onClick, setSavedName, setSavedDescription, saveFlow}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <h4>Save flow as component</h4>
                <hr/>
                <h4>Name:</h4>
                <input id="description" name='description' type='text'
                       onChange={setSavedName}/>
                <br/>
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <br/>
                <h4>Description:</h4>
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