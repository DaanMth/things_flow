import {Col, Row} from "react-grid-system";


function homePage() {
    return (

        <>
            <div className={"wholePage"}>
                <Row>
                    <Col sm={12} md={3} lg={2}/>
                    <Col sm={12} md={6} lg={8}>
                        <img className={"thingsFlow"} src="Images/ThingsFlowNewWay.png" alt="ThingsFlow Title"/>
                        <a className={"homeButton"} href="http://localhost:3000/flows">go to flows</a>

                    </Col>
                    <Col sm={12} md={3} lg={2}/>
                </Row>
            </div>
        </>
    )
}

export default homePage