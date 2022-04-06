import React from "react"
import { Container, Tab, Row, Nav, Col, Sonnet } from "react-bootstrap";
// import SweetAlert from 'react-bootstrap-sweetalert';

const About = () => {

    return(
        <>
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <p>I am tab1</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <p>I am tab2</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
        </>
    )
}

export default About;