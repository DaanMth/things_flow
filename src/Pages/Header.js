import React from "react";
import {Link, Outlet} from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <row>
                <div className='column'>
                    <Link to={"/"}><img className='logo' src={'Images/thingsLogo.png'} alt={"Hedgehog"}/></Link>
                </div>

                <div className='column'>
                    <div className='texts'>
                        <div className='column2'>
                            <Link to={"/Documentation"} className="text">Documentation</Link>
                        </div>
                        <div className='column2'>
                            <Link to={"/dragDrop"} className="text">Playground</Link>
                        </div>
                        <div className='column2'>
                            <Link to={"/flows"} className="text">Flows</Link>
                        </div>

                    </div>
                </div>
            </row>
            <Outlet/>
        </div>
    )
}

export default Header;