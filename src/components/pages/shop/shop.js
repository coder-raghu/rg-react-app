import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";


export default function Shop(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();
    const { cart, addItem } = useCartContext();
    const [quantity, setQuantity] = useState([]);
    const { user } = useUserContext();
    const navigate = useNavigate();
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

    if(user.isLoggedIn){
        navigate('/login');
    }

    if(loading){
        return(<Loader />);
    }

    const incrementQuantity = (id) => {
        // setQuantity([...quantity, { "id" : id, 'quantity': quantity+1 } ]);
        // console.log(quantity)
        setQuantity(quantity + 1)
    }
    
    const decrementQuantity = (id) => {
        // console.log("product id")
        // console.log(id);
        if(quantity<=1){
            setQuantity(1);
            // setQuantity([...quantity, { "id" : id, 'quantity': 1 } ]);
        } else {
            setQuantity(quantity - 1);
            // setQuantity([...quantity, { "id" : id, 'quantity': quantity - 1 } ]);
        }
    }

    const addToCart = (product) =>{
        addItem( product );
        swal("Added!", "Your product has been added to cart!", "success");
        // alert("I am clicked for add to cart");
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
                            <Col md="4" className="mb-5" key={product.id}>
                                <Card key={product.id}>
                                    <Card.Img variant="top" src={imageName} />
                                    <Card.Body>
                                        <Card.Title><NavLink to={view}>{product.title.substring(0, 30) + "..."}</NavLink></Card.Title>
                                        <Card.Text>{product.description.substring(0, 50) + "..."}</Card.Text>
                                        <p>${product.price}</p>
                                        {/* <Button variant="primary" className="me-2" onClick={()=> decrementQuantity(product.id)}>-</Button>
                                        <input type="text" style={{ width: '50px', 'textAlign':'center' }} name="quantity" value={quantity.filter((cart) => {
                                                console.log(product.id === cart.id ? cart.quantity : 1)
                                                return product.id === cart.id ? cart.quantity : 1;
                                            })}></input>
                                        <Button variant="primary" className="ms-2" onClick={()=> incrementQuantity(product.id) }>+</Button> */}
                                        <Button variant="primary" className="ms-2" onClick={()=> addToCart(product)}>Add to cart</Button>
                                        
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


