import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteModal from "../components/Modals/flowModals/DeleteModal";
import FlowListComponent from "../components/Flows/FlowListComponent";
import {motion as m} from "framer-motion";

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

    //Puts the components in the flow list
    useEffect(() => {
        getSavedFlows();
        // eslint-disable-next-line
    }, [])

    //token needed to authorize and run the API calls
    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    //Get the flows that are saved and put them in the flows list
    const getSavedFlows = () => {
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
                getSavedFlows();
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

            <m.div className={"wholePage"}
                   initial={{opacity: 0}}
                   animate={{opacity: 1}}
                   exit={{opacity:0}}
                   transition={{duration: 0.75, ease: "easeOut"}}>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search for a flow.."/>
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"/>
                    </button>
                    <button className={"filterButtonFilter"}><i className="fa fa-filter"/></button>
                </div>

                <div className={"flowNaming"}>
                    <ul>
                        <li>Name</li>
                        <li>Error</li>
                        <li>Time</li>
                        <li className={"flowFavorite"}>Favorite</li>
                    </ul>
                </div>

                <div className={"flowList"}>
                    {savedFlows.map((flow, index) => {
                        return (
                            <FlowListComponent flow={flow} handleOpenSaveModal={() => handleOpenSavemodal(index)}
                                               navigate={() => navigate("/dragDrop", {state: flow})}/>
                        )
                    })}
                </div>

                <Modal
                    open={openSaveModal}
                    onClose={handleCloseSaveModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={"deleteModal"}>
                        <DeleteModal handleCloseSaveModal={handleCloseSaveModal} removeFlow={() => removeFlow()}/>
                    </Box>
                </Modal>
            </m.div>
        </>
    )

}

export default Flows