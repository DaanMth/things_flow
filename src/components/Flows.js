

function Flows(){
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
                <div className={"flowList"}>
                    <div className={"flow"}>
                        <ul>
                            <li className={"flowTitle"}>Flow 1</li>
                            <li>0|0</li>
                            <li>13;45;82;115</li>
                            <li><a className={"flowListButton"} href="http://localhost:3000/dragDrop">go to flow</a></li>
                            <li>⭐</li>
                        </ul>
                    </div>
                    <div className={"flow"}>
                        <ul>
                            <li className={"flowTitle"}>Flow 2</li>
                            <li>0|0</li>
                            <li>21;64;01;587</li>
                            <li><a className={"flowListButton"} href="http://localhost:3000/dragDrop">go to flow</a></li>
                            <li>⭐</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Flows