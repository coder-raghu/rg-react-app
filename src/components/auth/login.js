import axios from "axios";
import React, { useState, useEffect } from "react"
import { Form, Container, Button, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
import { useUserContext } from "../context/userContext";



const Login = () => {
    
    const { register, handleSubmit, formState: { errors }, reset, resetField } = useForm();
    const [loading, SetLoading] = useState(false);
    const [loginError, SetLoginError] = useState( { message : '', type: 'danger' } );
    let navigate = useNavigate();
    const {user, logIn, token} = useUserContext();

    useEffect(() => {

        if(user.isLoggedIn){
            navigate('/products');
        }

        SetLoading(false);

    }, [])

    const onSubmit = (data) =>{
        // SetLoading(true);
        SetLoginError( { message : '', type:'danger' } );
        var requestUrl = 'http://127.0.0.1:5000/users/login';
        axios.post(requestUrl, data)
        .then(response => {
            if(response.status===200 && response.data.status){
                // swal("Loggedin!", "Loggedin successfully", "success");
                SetLoginError( { message : 'Loggedin successfully', type:'success' } );
                let logiUserData = response.data.data;
                logiUserData.authToken = response.data.token; //append jwt token
                // console.log(logiUserData)
                logIn(logiUserData);
                reset();
                setTimeout(function () { 
                    navigate('/products');
                }, 1000);
            } else {
                SetLoginError( { message : response.data.message, type:'danger' } );
                resetField('password')
                
            }
            SetLoading(false);
        });
    } 

    const error = {
        color: "red",
    }


    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h4 className='text-center mt-4 mb-4'>Login</h4>
                    
                    {loginError.message && <Alert variant={loginError.type}>
                        <p className="mb-0">{loginError.message}</p>
                    </Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow rounded">                      
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email")  } type="text"  placeholder="Enter email address" ></Form.Control>
                            <p style={error}>
                                {errors.email?.type === 'required' && "Email is required"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...register("password")  } type="password"  placeholder="Enter password" ></Form.Control>
                            <p style={error}>
                                {errors.password?.type === 'required' && "Password is required"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Button variant="primary" type="submit">
                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Login;