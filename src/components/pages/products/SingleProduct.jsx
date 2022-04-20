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
        await axios.post(`${apiUrl}products/show`,{ id })
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

    var imageUrl = '';
    if(productDetails.image){
        imageUrl = apiUrl + productDetails.image;
    } else {
        imageUrl = apiUrl + 'uploads/default.png';
    }
    return(
        <>
        <Container className="mt-3">
            <h4>Product Detail</h4>
            <Row>
                <Col>
                    <Image width="100%" src={imageUrl}></Image>
                </Col>
                <Col>
                    <h4>{productDetails.title}</h4><br/>
                    <h6>$ {productDetails.price}</h6><br/>
                    <p>{productDetails.description}</p>
                    
                    { productDetails.image_url && <div>image: {productDetails.image_url}</div>}
                    { productDetails.image_url && <div>image: <Image roundedCircle src={productDetails.image_url}></Image></div>}
                    {productDetails.previous &&
                        <Button className="me-5" onClick={() => pressPrevious(productDetails.previous.id)}>prev : {productDetails.previous.title}</Button>
                    }
                    {/* {user.isLoggedIn ?(<NavLink to="/products"><Button className="float-center">Back</Button></NavLink>) : (<NavLink to="/shop"><Button className="float-center">Back</Button></NavLink>)} */}
                    {productDetails.next && 
                        <Button className="float-end" onClick={() => pressNext(productDetails.next.id)}>Next : {productDetails.next.title}</Button>
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
}