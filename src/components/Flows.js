import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteModal from "./Modals/FlowModals/DeleteModal";
import FlowListComponent from "./Flows/FlowListComponent";

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

function Flows() {
    const [savedFlows, setSavedFlows] = useState([]);
    const [savedIndex, setSavedIndex] = useState([])
    const [openSaveModal, setOpenSaveModal] = React.useState(false);
    const navigate = useNavigate();

    //Open and closes the modals of the components inside the save button
    const handleOpenSavemodal = (index) => {
        setSavedIndex(index);
        setOpenSaveModal(true);
    }
    const handleCloseSaveModal = () => setOpenSaveModal(false);

    //token needed to authorize and run the API calls
    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    //Get the flows that are saved and put them in the flows list
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

    //Removing the flows from the list
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


    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
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
                        <li className={"flowFavorite"}>Favorite</li>
                    </ul>
                </div>

                {getSavedflows()}
                <div className={"flowList"}>
                    {savedFlows.map((flow, index) => {
                        return (
                            <FlowListComponent flow={flow} handleOpenSaveModal={() => handleOpenSavemodal(index)}
                                               navigate={() => navigate("/dragDrop", {state: flow.flowComponents})}/>
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
                        <DeleteModal handleCloseSaveModal={handleCloseSaveModal} removeFlow={() => removeFlow()}/>
                    </Box>
                </Modal>
            </div>
        </>
    )

}

export default Flows