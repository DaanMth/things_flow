import React from 'react'
import Typography from "@mui/material/Typography";

function PremadeModals({onClick, modal}) {

    return <div>
        <div className={"close"} onClick={onClick}>x</div>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                   <div className={"sidebarModalTitle"}>{modal[0].name}</div>
                </Typography>
                <hr/>
                <Typography  id="modal-modal-title" variant="h6" component="h2">
                    <div className={"sidebarModalDescription"}>{modal[0].description}</div>
                </Typography>
            </div>
            <br/>
    </div>


}

export default PremadeModals