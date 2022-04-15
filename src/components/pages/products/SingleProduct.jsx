import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container, Image, Row, Col } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";

export default function SingleProduct (){

    const {id} = useParams();
    const [loading, SetLoading] = useState(true);
    const [productDetails, SetProductDetails] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useUserContext(); 

    async function getProductDetails(){
        await axios.post(`${apiUrl}product/show`,{ id })
        .then(response => {
            if(response.data.status){
                SetProductDetails(response.data.data);
                SetLoading(false);   
            }
        });
    }

    useEffect(() => {
        
        getProductDetails();

    },[SetProductDetails]);
    
    if(loading){
        return(<Loader />);
    }
    const pressPrevious = (id) =>{
        getProductDetails(id);
        //navigate(`/productDetails/${id}`);
    }
    const pressNext = (id) =>{
        getProductDetails(id);
        //navigate(`/productDetails/${id}`);
    }

    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h4>Product Detail</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control type="text" readOnly value={productDetails.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" readOnly value={productDetails.price}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" readOnly value={productDetails.qty}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} readOnly value={productDetails.description}/>
                        </Form.Group>
                    </Form>
                    { productDetails.image_url && <div>image: {productDetails.image_url}</div>}
                    { productDetails.image_url && <div>image: <Image roundedCircle src={productDetails.image_url}></Image></div>}
                    {productDetails.previous &&
                        <Button className="me-5" onClick={() => pressPrevious(productDetails.previous.id)}>prev : {productDetails.previous.title}</Button>
                    }
                    {user.isLoggedIn ?(<NavLink to="/products"><Button className="float-center">Back</Button></NavLink>) : (<NavLink to="/shop"><Button className="float-center">Back</Button></NavLink>)}
                    {productDetails.next && 
                        <Button className="float-end" onClick={() => pressNext(productDetails.next.id)}>Next : {productDetails.next.title}</Button>
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
}