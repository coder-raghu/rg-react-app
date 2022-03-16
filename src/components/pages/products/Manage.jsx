import { axios } from "axios";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// import Loader from "../../global/Loader";


export default function Manage(){

    // const [loading, SetLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({});
    
    const handleChange = (event) => {
        console.log(event.target.name);
        // console.log(event.target.value);
        setValues({
            ...values, [event.target.name ] : event.target.value 
        })
        // console.log(values)        
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }  else {
            setValidated(true);
            console.log("Ready for ajax call")
            console.log(values);

            // axios.post(``, { values })
            //     .then(res => {
            //         console.log(res);
            //         console.log(res.data);
            //     })
        }
        
    };

    // if(loading){
    //     return(<Loader />);
    // }

    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {/* <h1 className="header">Add Product</h1> */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                name="title"
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please enter product name</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12" className="mb-1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Price"
                                name="price"
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter price.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12" className="mb-1">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter quantity" 
                                name="quantity" 
                                required 
                                onChange={handleChange}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter quantity
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="12" className="mb-1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                name="description" 
                                required 
                                rows="3"
                                onChange={handleChange} 
                                />
                            <Form.Control.Feedback type="invalid">
                                Please enter description
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                        <Form.Group as={Col} md="12" className="mb-1">
                            <Button variant="primary" type="submit">Submit form</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )

}


