import { Spinner, Container, Row, Col } from "react-bootstrap";

const Loader = () =>{
    return(
        <>
            <Container>
                <Row>
                    <Col className="mt-3" style={{ textAlign:'center' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Loader;