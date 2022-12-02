import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Picture from "./Picture";
import DragDrop from "./DragDrop";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Flows(){
    const [savedFlows, setSavedFlows] = useState([]);
    const [savedIndex, setSavedIndex] = useState([])
    const navigate = useNavigate();
    const [openSaveModal, setOpenSaveModal] = React.useState(false);

    //Open and closes the modals of the components inside the save button
    const handleOpenSavemodal = (index) => {
        setSavedIndex(index);
        setOpenSaveModal(true);
    }
    const handleCloseSaveModal = () => setOpenSaveModal(false);

    //token needed to authorize and run the API calls
    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    const getSavedflows = () => {
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'getSavedFlows'
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data, "lol");
                setSavedFlows(res.data);
            })
    }

    const removeFlow = () => {
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'removeFlow',
                'args': [savedIndex]
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data, "lol");
                handleCloseSaveModal();
            })
    }


    return(

        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </head>
            <div className={"wholePage"}>
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Search for a flow.."/>
                            <button type="submit" className="searchButton">
                                <i className="fa fa-search"/>
                            </button>
                        <a className={"filterButton"}><i className="fa fa-filter"/></a>
                    </div>

                <div className={"flowNaming"}>
                    <ul>
                        <li>Name</li>
                        <li>Error</li>
                        <li>Time</li>
                        <li></li>
                        <li className={"flowFavorite"}>Favorite</li>
                    </ul>

                </div>
                {getSavedflows()}
                <div className={"flowList"}>
                    {savedFlows.map((flow, index) => {
                        return(
                        <div className={"flow"}>
                            <ul>
                                <li className={"flowTitle"}>{flow.flowName}</li>
                                <li className={"flowErrors"}>0|0</li>
                                <li>13;45;82;115</li>
                                <li><a className={"flowListButton"} onClick={() => navigate("/dragDrop", { state: flow.flowComponents })}>go to flow</a></li>
                                <li>⭐</li>
                                <div className={"removeFlow"} onClick={() => handleOpenSavemodal(index)}>x</div>
                            </ul>
                        </div>
                        )
                    })}
                </div>

                <Modal
                    open={openSaveModal}
                    onClose={handleCloseSaveModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className={"close"} onClick={handleCloseSaveModal}>x</div>
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <div className={"Title"}>Delete</div>
                                <div>Are you sure you want to delete this flow?</div>
                                <hr/>
                            </Typography>
                            <br/>
                            <button className="deleteButton" onClick={() => removeFlow()}>Delete</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )

}
export default Flows