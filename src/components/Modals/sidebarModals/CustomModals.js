import React from 'react'
import Typography from "@mui/material/Typography";

function CustomModals({onClick, modal, deleteComponent}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
        <div>
            <div className={"sidebarModalImage"}>
                <img
                    className={"imgSidebar"}
                    alt="modal"
                    src={modal[0].url}
                    width="100px"
                    height="100px"
                    role="button"
                    tabIndex="0"
                />
            </div>
            <div className={"sidebarModalText"}>
                <Typography className={"sidebarModalTitle"} id="modal-modal-title" variant="h6" component="h2">
                    {modal[0].name}
                </Typography>
                <Typography className={"sidebarModalDescription"} id="modal-modal-description" sx={{mt: 2}}>
                    {modal[0].description}
                </Typography>
            </div>
            <br/>
            <button onClick={deleteComponent}
                    className={"deleteButton"}>Remove
            </button>
        </div>
    </div>


}

export default CustomModals