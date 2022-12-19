import {Col, Row} from "react-grid-system";
import {motion as m} from "framer-motion";


function homePage() {
    return (

        <>
            <m.div className={"wholePage"}
                   initial={{y: "100%"}}
                   animate={{y: "0%"}}
                   exit={{opacity: 1}}
                   transition={{duration: 0.8, ease: "easeOut"}}>
                <Row>
                    <Col sm={12} md={3} lg={2}/>
                    <Col sm={12} md={6} lg={8}>
                        <m.img className={"thingsFlow"} src="Images/ThingsFlowNewWay.png" alt="ThingsFlow Title"
                               initial={{y: "100%"}}
                               animate={{y: 0}}
                               transition={{delay: 0.5, duration: 0.9}}/>
                        <m.a className={"homeButton"} href="http://localhost:3000/flows"
                             initial={{y: 700}}
                             animate={{y: 0}}
                             transition={{delay: 0.5, duration: 1.0}}>go to flows
                        </m.a>
                    </Col>
                    <Col sm={12} md={3} lg={2}/>
                </Row>
            </m.div>
        </>
    )
}

export default homePage