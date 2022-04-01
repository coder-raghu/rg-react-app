import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import Loader from "../../global/Loader";


export default function Shop(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();
    const { cart, addItem } = useCartContext();
    const [quantity, setQuantity] = useState(1);

    const apiUrl = process.env.REACT_APP_API_URL;
  
    useEffect(() => {
        async function getProducts(){
            const response = await axios.get(`${apiUrl}products`); 
            if(response.status===200){
                setProducts(response.data.data);
                SetLoading(false);   
            }
        }
        getProducts();
    }, []);

    if(loading){
        return(<Loader />);
    }

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }
    
    const decrementQuantity = () => {
        if(quantity<=1){
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    }

    return(
        <>
        <Container>
                <h4>Shop</h4>
                <Row>
                   {products && products.map((product) => {
                        const view = `/productDetails/${product.id}`;
                        var imageName = '';
                        if(product.image){
                            imageName = apiUrl + product.image;
                        } else {
                            imageName = apiUrl + 'uploads/default.png';
                        }
                        return (
                            <>
                            <Col md="4" className="mb-5">
                                <Card key={product.id}>
                                    <Card.Img variant="top" src={imageName} />
                                    <Card.Body>
                                        <Card.Title><NavLink to={view}>{product.title.substring(0, 30) + "..."}</NavLink></Card.Title>
                                        <Card.Text>{product.description.substring(0, 50) + "..."}</Card.Text>
                                        
                                        <Button variant="primary" className="me-2" onClick={()=> decrementQuantity()}>-</Button>
                                        <input type="text" style={{ width: '50px', 'textAlign':'center' }} onChange="" name="quantity" value={quantity}></input>
                                        <Button variant="primary" className="ms-2" onClick={()=> incrementQuantity() }>+</Button>
                                        
                                        <Button variant="primary" className="ms-2" onClick={()=> addItem(product)}>Add to cart</Button>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                            </>
                        )
                    })}
                </Row>

        </Container>
        </>
    )

}


