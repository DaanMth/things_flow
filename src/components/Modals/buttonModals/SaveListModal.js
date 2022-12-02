import React from 'react'
import Typography from "@mui/material/Typography";

function SaveListModal({onClick, setSavedListName, saveAsList}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <h4>Save flow as list</h4>
                <hr/>
                <h4>Name:</h4>
                <input id="description" name='description' type='text' maxLength='25'
                       onChange={setSavedListName}/>
                <br/>
            </Typography>
            <br/>
            <button className="math" onClick={saveAsList}>Save</button>
        </div>
    </div>


}

export default SaveListModal