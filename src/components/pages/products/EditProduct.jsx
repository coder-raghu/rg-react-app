import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loader from "../../global/Loader";

export default function EditProduct(){

    const {id} = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, SetLoading] = useState(true);
    const [product, SetProduct] = useState();
    let navigate = useNavigate();

    async function getProduct(id){
        const response = await axios.get(`http://127.0.0.1:8000/api/show/${id}`); 
        if(response.status ===200){
            SetProduct(response.data.data);
            SetLoading(false);   
        } else if(response.status ===404){
            navigate('*');
        }
    }

    const onSubmit = (data) =>{
        // setValues(data);
        // console.log("Send call to save data")
        axios.post('http://127.0.0.1:8000/api/store', data)
        .then(response => {
            if(response.status === 200){
                navigate('/products');
                reset();
            }
        });
    } 

    useEffect(() => {
        
        getProduct(id);

    },[]);
    
    if(loading){
        return(<Loader />);
    }
    const error = {
        color: "red",
    }
    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    {/* <h1 className="header">Add Product</h1> */}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control {...register("title", { required: true, minLength: 3 })} type="name" placeholder="Enter product name"></Form.Control>
                            <p style={error}>
                            {errors.title?.type === 'required' && "Product title is required"}
                            {errors.title?.type === 'minLength' && "Please enter more than 3 character"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Price</Form.Label>
                            <Form.Control {...register("price", { required: true })  } type="text"  placeholder="Enter price" ></Form.Control>
                            <p style={error}>
                            {errors.price?.type === 'required' && "price is required"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control {...register("quantity", { required: true })  } type="text"  placeholder="Enter quantity" ></Form.Control>
                            <p style={error}>
                            {errors.quantity?.type === 'required' && "quantity is required"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Description</Form.Label>
                            <Form.Control  {...register("description", {required:true, minLength: 10}) } as="textarea" name="description" rows="3"></Form.Control>
                            <p style={error}>
                            {errors.description?.type === 'required' && "description is required"}
                            {errors.description?.type === 'minLength' && "Please enter more than 10 character"}
                            </p>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" type="submit">Submit</Button>{' '}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}