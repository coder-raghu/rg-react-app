import axios from "axios";
import { useReducer } from "react";
import { useEffect, useState } from "react";
import { Container, Button, Card, Col, Row, Form } from "react-bootstrap";
import { useNavigate, NavLink, useParams, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
// import cartReducer from "../../../reducer/cartReducer";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";


export default function Shop(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();
    const { cart, addItem } = useCartContext();
    // const [quantity, setQuantity] = useState([]);
    const { user } = useUserContext();
    const navigate = useNavigate();
    const param = useParams();
    let [searchParams] = useSearchParams();
    const apiUrl = process.env.REACT_APP_API_URL;

    // const initialState = { item:[], totalAmount:'', totalItem:'' }
    // const [state, dispatch] = useReducer(cartReducer, initialState);

    // console.log("first")
    // console.log(searchParams.get('sort'))

    async function getProducts(sortType=null, newest=null){
        
        var url = `${apiUrl}products`;
        
        const querySort = searchParams.get('sort')
        if(querySort!=null && (sortType===querySort || sortType===null)) {
            sortType = querySort;
        }
        
        const queryNewest = searchParams.get('newest');
        if(queryNewest!=null && newest===queryNewest) {
            newest = queryNewest;
        }

        if(sortType!=null){
            navigate(`/shop/?sort=${sortType}`);
            url = `${apiUrl}products/?sort=${sortType}`;
        } 
        if(newest!=null){
            navigate(`/shop/?newest=${newest}`);
            url = `${apiUrl}products/?newest=${newest}`;
            
        }
        const response = await axios.get(url); 
        if(response.status===200){
            setProducts(response.data.data);
            SetLoading(false);   
        }
    }

    useEffect(() => {

        getProducts();

    }, []);

    const sorting = (event) =>{
        const sortType = event.target.value;
        SetLoading(true)
        getProducts(sortType);
    }
    const newest = (event) =>{
        const sortType = event.target.value;
        SetLoading(true)
        getProducts('',sortType);
    }

    if(user.isLoggedIn){
        navigate('/login');
    }

    if(loading){
        return(<Loader />);
    }

    // const incrementQuantity = (id) => {
        // setQuantity([...quantity, { "id" : id, 'quantity': quantity+1 } ]);
        // console.log(quantity)
        // setQuantity(quantity + 1)
    // }
    
    // const decrementQuantity = (id) => {
        // console.log("product id")
        // console.log(id);
        // if(quantity<=1){
            // setQuantity(1);
            // setQuantity([...quantity, { "id" : id, 'quantity': 1 } ]);
        // } else {
            // setQuantity(quantity - 1);
            // setQuantity([...quantity, { "id" : id, 'quantity': quantity - 1 } ]);
        // }
    // }

    const addToCart = (product) =>{
        addItem( product );
        // dispatch({ type: 'addItem', payload: product });

        swal("Added!", "Your product has been added to cart!", "success");
        // alert("I am clicked for add to cart");
    }
   
    

    return(
        <>
        <Container>
                <h4>Shop</h4>

                <Form.Group as={Col} md="12">
                    <Form.Label>Sort By: &nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                    <Form.Check
                        inline
                        label="Low To high"
                        name="sorting"
                        type="radio"
                        value="ASC"
                        id="inline-radio-1"
                        onChange={sorting}
                        defaultChecked={ searchParams.get('sort')==='ASC' }
                    />
                    <Form.Check
                        inline
                        label="High to low"
                        name="sorting"
                        type="radio"
                        value="DESC"
                        id="inline-radio-2"
                        onChange={sorting}
                        defaultChecked={ searchParams.get('sort')==="DESC" }
                    />
                    <Form.Check
                        inline
                        label="Newest First"
                        name="sorting"
                        type="radio"
                        value="DESC"
                        id="inline-radio-3"
                        onChange={newest}
                        defaultChecked={ searchParams.get('newest')==="DESC" }
                    />
                </Form.Group>
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
                                <Card>
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


