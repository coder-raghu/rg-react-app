import axios from "axios";
import React, { useState, useEffect } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useUserContext } from "../context/userContext";
import Loader from "../global/Loader";

const Register = () => {
   
    const { register, handleSubmit, formState: { errors, isValid }, getValues, reset, setError } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            'name' : 'Raghu check email exists',
            'password' : '123123',
            'confirm_password' : '123123'
        },
    });
    const [loading, SetLoading] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    let navigate = useNavigate();
    const { user } = useUserContext();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        SetLoading(false);
    }, [])

    if(user.isLoggedIn){
        navigate('/products');
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit = async (data) =>{
        await sleep(2000);

        const status = await axios.post(`${apiUrl}users/checkEmail`,{email:data.email})
        .then(async response => {
            if(!response.data.status){
                setIsEmailValid(false);
                await setError("email", { type: "custom", message: response.data.message});
                return true;
            }
        });
        
        console.log("first")
        console.log(data)

        if(isEmailValid){
            var requestUrl = `${apiUrl}users/save`;
            axios.post(requestUrl, data)
            .then((response) => {
                if(response.data.status){
                    swal("Added!", "User registration sucessfully.", "success");
                    reset();
                    navigate('/login');
                }
            });
        }
        // return false
    } 
    
    if(loading){
        return(<Loader />);
    }

    const error = {
        color: "red",
    }

    // async function isEmailUnique (email){
    //     await axios.post(`${apiUrl}users/checkEmail`,{email})
    //     .then( (response) => {
    //         if(!response.data.status){
    //             setError("email", {
    //                 type: "validate",
    //             });
    //             // console.log("response wait false")
    //             setIsEmailValid(false);
    //             return false;
    //         } else {
    //             // console.log("response wait true")
    //             setIsEmailValid(true);
    //             return true;
    //         }
    //     });
    // }

    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h4 className='text-center mt-4 mb-4'>Register User</h4>
                   
                  
                    <Form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow rounded">
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
                            <Form.Control {...register("email", { 
                                required: true, 
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                },
                                validate: async (email) => {
                                    await axios.post(`${apiUrl}users/checkEmail`,{email})
                                    .then( async (response) => {
                                        if(!response.data.status){
                                            await setError("email", { type: "custom", message: response.data.message});
                                            return response.data.status;
                                        } else {
                                            return response.data.status;
                                        }
                                    });
                                },
                            })} type="email"  placeholder="Enter email address" ></Form.Control>
                            <p style={error}>
                                {errors.email?.type === 'required' && "Email is required"}
                                {errors.email?.type === 'pattern' && "Please enter a valid email"}
                                {errors.email?.type === 'custom' && errors.email.message }
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