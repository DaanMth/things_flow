import React from 'react'

function DocumentationCard({picture}) {

    return <div className={"documentationCard"}>
        <img
            className={"docImg"}
            src={picture.url}
            width="100px"
            alt="Not found"
            height="100px"
            role="button"
            tabIndex="0"
        />
        <div className={"docText"}>
            <div className={"docTitle"}>{picture.name}</div>
            <div className={"docDescription"}>{picture.description}</div>
        </div>
    </div>


}

export default DocumentationCard