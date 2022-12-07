//API call to get the components inside the sidebar
import axios from "axios";
import React, {useState} from "react";
import Picture from "./Picture";
import DocumentationCard from "../components/Documentation/DocumentationCard";

function Documentation() {
    const [documentationList, setDocumentationList] = useState([]);

    //token needed to authorize and run the API calls
    const token = `xUN1z8f3YQ6flB0ZYOWHoc`;

    //API call to get the components and setting them in the documentation list
    const getDocumentationList = () => {
        axios.post("http://localhost:9210/collection/Collectie_Daan", {
                'type': 'run',
                'name': 'getSidebarList'
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data);
                setDocumentationList(res.data);
            })
    }

    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </head>

            <div className={"documentation"}>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search for a component.."/>
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"/>
                    </button>
                    <a className={"filterButton"}><i className="fa fa-filter"/></a>
                </div>

                <br/>

                <div className={"listBackground"}>
                    <div className={"allCards"}>
                        {getDocumentationList()}
                        {documentationList.map((picture) => {
                            return (
                                <DocumentationCard picture={picture}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Documentation