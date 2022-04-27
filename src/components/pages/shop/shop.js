import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Card, Col, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import queryString from "query-string";


export default function Shop() {
    
    var filterObj =  {search:'',sort:'',newest:'',minPrice:'',maxPrice:''};
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [selectedMinPrice, setSelectedMinPrice] = useState();
    const [selectedMaxPrice, setSelectedMaxPrice] = useState();
    const [filterData, setFilterData] = useState(filterObj);
    const { user } = useUserContext();
    const { addItem } = useCartContext();
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setValue } = useForm();
    let [searchParams] = useSearchParams();
    const apiUrl = process.env.REACT_APP_API_URL;

    // const querySort = searchParams.get('sort')
    // const queryNewest = searchParams.get('newest');
    // const querySearch = searchParams.get('search');
    // const queryMinPrice = searchParams.get('minPrice');
    // const queryMaxPrice = searchParams.get('maxPrice');
    // setFilterData({...filterData,search:querySearch,sort:querySort,newest:queryNewest,minPrice:queryMinPrice,maxPrice:queryMaxPrice})

    

    async function getProducts() {

        var apiCallUrl = `${apiUrl}products`;

        var url = `?${queryString.stringify(filterData)}`;
        navigate(`/shop/${url}`);
        
        const response = await axios.get(`${apiCallUrl}${url}`);
        if (response.data.status === true) {
            setProducts(response.data.data);
            setMinPrice(response.data.other.min);
            setMaxPrice(response.data.other.max);
            setLoading(false);
        }
    }
  
    useEffect(() => {
        const searchVal = getValues('search')
        if(searchVal){
            setValue('search', searchVal);
        } else {
            setValue('search', '');
        }
        getProducts();

    }, [filterData]);

    const sorting = (event) => {       
        const sortType = event.target.value;
        setFilterData({...filterData,sort: sortType, newest: ''})
    }
    const newest = (event) => {
        const sortType = event.target.value;
        setFilterData({...filterData, newest: sortType, sort: '' })
    }

    const onSubmit = (data) => {
        const search = data.search
        setFilterData({...filterData, search:search })
    }

    const getPrice = async (value) => {
        const minPrice = value[0];
        const maxPrice = value[1]
        setSelectedMinPrice(value[0])
        setSelectedMaxPrice(value[1])
        setFilterData({...filterData, maxPrice:maxPrice, minPrice:minPrice })
    }  

    if (user.isLoggedIn) {
        navigate('/login');
    }

    if (loading) {
        return ( < Loader /> );
    }

    const addToCart = (product) => {
        addItem(product);
        swal("Added!", "Your product has been added to cart!", "success");
        // dispatch({ type: 'addItem', payload: product });
    }
    
    return ( <>
        <Container>

        <Row className="mb-4 mt-4">
            <Col md={5}>
            <Form.Group>
                <Form.Label >Sort By:&nbsp; &nbsp; </Form.Label> 
                <Form.Check inline label = "Low To high"
                    name = "sorting"
                    type = "radio"
                    value = "ASC"
                    id = "inline-radio-1"
                    onChange = { sorting }
                    defaultChecked = { searchParams.get('sort') === 'ASC' }
                /> 
                <Form.Check inline label = "High to low"
                    name = "sorting"
                    type = "radio"
                    value = "DESC"
                    id = "inline-radio-2"
                    onChange = { sorting }
                    defaultChecked = { searchParams.get('sort') === "DESC" }
                    /> 
                <Form.Check inline label = "Newest First"
                    name = "sorting"
                    type = "radio"
                    value = "DESC"
                    id = "inline-radio-3"
                    onChange = { newest }
                    defaultChecked = { searchParams.get('newest') === "DESC" }
                />
            </Form.Group> 
            </Col>
            <Col md={3}>
                Price Filter: {selectedMinPrice} - {selectedMaxPrice}
                <Slider 
                    range
                    step={100}
                    // marks={{ 1:minPrice, 1250:maxPrice }}
                    min={minPrice}
                    max={maxPrice}
                    defaultValue={[minPrice, maxPrice]}
                    onChange={(value) => getPrice(value)}
                    tipFormatter={value => <span className="tooltip">{value}€</span>}
                />
            </Col>
            <Col md={4}>
                <Form onSubmit = { handleSubmit(onSubmit) }>
                    <Row>
                        <Col md={8}>
                            <Form.Control {...register("search") } placeholder = "Search" ></Form.Control> 
                        </Col>
                        <Col>
                            <Button variant = "outline-primary"type = "submit" > Search </Button>{' '} 
                        </Col>
                    </Row> 
                </Form>
            </Col>
            {/* <Col md={3}>
                <Button onClick={resetFilter} className="float-center">Reset</Button>
            </Col> */}
        </Row>

        <Row> {
            products && products.map((product) => {
                const view = `/productDetails/${product.id}`;
                var imageName = '';
                if (product.image) {
                    imageName = apiUrl + product.image;
                } else {
                    imageName = apiUrl + 'uploads/default.png';
                }
                return ( 
                    <>
                    <Col md = "4"className = "mb-5"key = { product.id } >
                        <Card >
                            <Card.Img variant = "top"src = { imageName }/> 
                            <Card.Body >
                                <Card.Title > <NavLink to = { view } > { product.title.substring(0, 30) + "..." } </NavLink></Card.Title >
                                <Card.Text > { product.description.substring(0, 50) + "..." } </Card.Text> 
                                <p> $ { product.price } </p> {
                                /* <Button variant="primary" className="me-2" onClick={()=> decrementQuantity(product.id)}>-</Button>
                                    <input type="text" style={{ width: '50px', 'textAlign':'center' }} name="quantity" value={quantity.filter((cart) => {
                                            console.log(product.id === cart.id ? cart.quantity : 1)
                                            return product.id === cart.id ? cart.quantity : 1;
                                        })}></input>
                                    <Button variant="primary" className="ms-2" onClick={()=> incrementQuantity(product.id) }>+</Button> */
                            } 
                                <Button variant = "primary" className = "ms-2" onClick = { () => addToCart(product) } > Add to cart </Button>
                            </Card.Body> 
                    </Card> 
                    </Col> 
                    </>
                )
            })
        } 
        </Row>

        </Container> 
        </>
    )

}