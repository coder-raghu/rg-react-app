import axios from "axios";
import React, { useState, useEffect } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../global/Loader";

const Register = () => {
   
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
    const [loading, SetLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {

        SetLoading(false);

    }, [])

    const onSubmit = (data) =>{
    
        var requestUrl = 'http://127.0.0.1:5000/user/save   ';
        axios.post(requestUrl, data)
        .then(response => {
            if(response.status === 200){
                swal("Added!", "User registration sucessfully.", "success");
                navigate('/login');
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
                    <h4>Register User</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Name</Form.Label>
                            <Form.Control {...register("name", { required: true, minLength: 3 })} type="text" placeholder="Enter name"></Form.Control>
                            <p style={error}>
                                {errors.name?.type === 'required' && "Name is required"}
                                {errors.name?.type === 'minLength' && "Please enter more than 3 character"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email", { required: true, pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                }, })  } type="email"  placeholder="Enter email address" ></Form.Control>
                            <p style={error}>
                                {errors.email?.type === 'required' && "Email is required"}
                                {errors.email?.type === 'pattern' && "Please enter a valid email"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...register("password", { required: true, minLength: 6 })  } type="password"  placeholder="Enter password" ></Form.Control>
                            <p style={error}>
                                {errors.password?.type === 'required' && "Password is required"}
                                {errors.password?.type === 'minLength' && "Password must have at least 6 characters"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control {...register("confirm_password", { required: true,minLength: 6, validate: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Passwords should match!"; 
                                } }) 
                                } type="password"  placeholder="Enter confirm password" ></Form.Control>
                            <p style={error}>
                                {errors.confirm_password?.type === 'required' && "Confirm password is required"}
                                {errors.confirm_password?.type === 'minLength' && "Password must have at least 6 characters"}
                                {errors.confirm_password?.type === 'validate' && "Passwords should match!"}
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

export default Register;