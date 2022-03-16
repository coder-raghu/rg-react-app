import axios from "axios";
import React, { useState, useEffect } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../../config/Api";
import Loader from "../../global/Loader";


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] ='application/json';

const AddEdit = () => {


    let {id} = useParams();
    const { register, handleSubmit, formState: { errors },setValue, reset } = useForm();
    const [loading, SetLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
      const products = async () =>{
        const response = await axios.get(`/show/${id}`); 
        if(response.status===200){
            let dataObj = response.data.data;
            setValue('title', dataObj.title)
            setValue('price', dataObj.price)
            setValue('quantity', dataObj.qty)
            setValue('description', dataObj.description)
            SetLoading(false);
        }
      }
      if(id)
          products();
      else
        SetLoading(false);

    }, [])

    const onSubmit = (data) =>{

        // console.log(data)
        
        // const file = data.image[0];
        // const storageRef = AddEdit.storage().ref();
        // const fileRef = storageRef.child(file.name);
        // fileRef.put(file).then(() => {
        //     console.log("Uploaded a file");
        // });
        const formData = new FormData();
        // formData.append('image', data.image[0]);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        
        if(id){
            // formData.append('id', id);
            data.id = id;
        }
        const header = { headers: { "Content-Type": "multipart/form-data" } }; 
        // let header = { 
        //         headers: {
        //             "Content-Accept": "multipart/form-data",
        //         },
        //     }
        
        // console.log(formData);
        axios.post('http://127.0.0.1:8000/api/store', data, header)
        .then(response => {
            if(response.status === 200){
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