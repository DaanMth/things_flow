import {useDrag} from "react-dnd";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';

function NewModal(style, modal, handleClose, saveValue, fileName, handleChange, middleValue, setMiddleValue, modalValue, setmodalValue ){

    return <Box sx={style}>
            {(() => {
                if (modal[0].sort === "beginComponent") {
                    return (
                        <div>
                            <div className={"close"} onClick={handleClose}>x</div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modal[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modal[0].description}
                            </Typography>
                            <br/>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className={"fileTitle"}>Current file: </div> <div className={"fileBox"}>{fileName}</div>
                            </Typography>

                            <br/>
                            <label htmlFor="file">Upload a file</label>
                            <br/>
                            <input type="file" id="file" accept=".json" onChange={handleChange}/>
                            <br/>
                        </div>
                    )
                }
                if (modal[0].name === "Convert") {
                    return (
                        <div>
                            <div className={"close"} onClick={handleClose}>x</div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modal[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modal[0].description}
                            </Typography>
                            <br/>
                            <h4>From:</h4>
                            <select value={middleValue[0]} id="channels" name="channels" onChange={event => middleValue.splice(0,1,event.target.value)}>
                                <option>Select an option..</option>
                                <option value="JSON">JSON</option>
                            </select>
                            <h4>To:</h4>
                            <select value={middleValue[1]} id="channels" name="channels" onChange={event => middleValue.splice(1,1,event.target.value)}>
                                <option>Select an option..</option>
                                <option value="DutyCalls">DutyCalls</option>
                            </select>
                            <button className="componentButton" onClick={() => saveValue(modal[0].id, "middleComponent")}>Save</button>
                        </div>
                    )
                }
                if (modal[0].name === "Title") {
                    return (
                        <div>
                            <div className={"close"} onClick={handleClose}>x</div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modal[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modal[0].description}
                            </Typography>
                            <br/>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                current value: <h4>{modal[0].number}</h4>
                            </Typography>
                            <br/>
                            <input id="description" name='description' type='text' onChange={event => setMiddleValue(event.target.value)}/>
                            <br/>
                            <button className="componentButton" onClick={() => saveValue(modal[0].id, "middleComponent")}>Save</button>
                        </div>
                    )
                }
                if (modal[0].name === "Change Title") {
                    return (
                        <div>
                            <div className={"close"} onClick={handleClose}>x</div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modal[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modal[0].description}
                            </Typography>
                            <br/>
                        </div>
                    )
                }
                if (modal[0].sort === "endComponent") {
                    return (
                        <div>
                            <div className={"close"} onClick={handleClose}>x</div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modal[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modal[0].description}
                            </Typography>
                            <br/>
                            <h4>Channels:</h4>
                            <select value={modalValue} id="channels" name="channels" onChange={event => setmodalValue(event.target.value)}>
                                <option value="None">Choose an option...</option>
                                <option value="privateChannel">Private Channel</option>
                                <option value="ThingsFlow">ThingsFlow</option>
                            </select>
                            <button className="componentButton" onClick={() => saveValue(modal[0].id, "endComponent")}>Save</button>
                        </div>
                    )
                }else {
                    return (
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modal[0].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modal[0].description}
                            </Typography>
                            <br/>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                current value: <h4>{modal[0].number}</h4>
                            </Typography>
                            <div>
                                <br/>
                                <h4>Value:</h4>
                                <input className="value" id="description" name='description' type='number' onChange={event => setmodalValue(event.target.value)}/>
                                <button className="componentButton" onClick={() => saveValue(modal[0].id)}>Save</button>
                            </div>
                        </div>
                    )
                }
            })()}

        </Box>

}

export default NewModal