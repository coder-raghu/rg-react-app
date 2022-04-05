import axios from "axios";
import React, { useState, useEffect } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../../global/Loader";

const AddEdit = () => {


    let {id} = useParams();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [loading, SetLoading] = useState(true);
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const products = async () =>{
            await axios.post(`${apiUrl}product/show`, {id})
            .then((response) => {
                if(response.data.status === true){
                    const dataObj = response.data.data[0];
                    setValue('title', dataObj.title)
                    setValue('price', dataObj.price)
                    setValue('quantity', dataObj.qty)
                    setValue('description', dataObj.description)
                    SetLoading(false);   
                }
            });       
        }
        if(id)
            products();
        else
            SetLoading(false);

    }, [])

    const onSubmit = (data) =>{
       
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        
        let axiosConfig = {
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
            }
          };
        
        var requestUrl = `${apiUrl}product/store`;
        if(id){
            formData.append('id', id);
            // data.id = id;
            requestUrl = `${apiUrl}product/update`;
        }
    
        axios.post(requestUrl, formData, axiosConfig)
        .then(response => {
            if(response.status === 200){
                if(id){
                    swal("Updated!", "Product Updated", "success");
                } else {
                    swal("Added!", "Product Added", "success");
                }
                navigate('/products');
                reset();
            }
        });
    } 

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
                <Col md={{ span: 8, offset: 2 }}>
                    
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

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control  { ...register("image") }  type="file" />
                            <p style={error}>
                                {errors.image?.type === 'required' && "image is required"}
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

export default AddEdit;