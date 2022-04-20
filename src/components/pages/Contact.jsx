import axios from "axios";
import React, { useState } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";


const Contact = () => {

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
    const [contact, setContact] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const onSubmit = (data) =>{
        
        var requestUrl = `${apiUrl}contacts`;
        axios.post(requestUrl, data)
        .then((response) => {
            if(response.data.status === true){
                setContact(data);
                swal("Added!", "Contact form submmited sucessfully.", "success");
                reset();
            }
        }).then((response) => {
            console.log("first")
            console.log(response)
        }).catch((error) => {
            if(error.response.status===400){
                console.log(error.response.data.errors)
                error.response.data.errors.map((error) => {
                    setError(error.param, { type: 'custom', message: error.msg });
                })

            }
        });
    } 

    const error = {
        color: "red",
    }

    return(
        <>
        <Container>
            <Row className="mt-3">
                <Col>

                    { contact.name &&
                        <div className="submitted-record">
                            <div>Name: {contact.name}</div>
                            <div>Email: {contact.email}</div>
                            <div>Mobile: {contact.mobile}</div>
                            <div>Message: {contact.message}</div>
                        </div>
                    }

                    <h4>Fill up the form and connect with us.</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control {...register("name")} type="name" placeholder="Enter name"></Form.Control>
                            <p style={error}>
                            {errors.name?.type === 'required' && "Name is required"}
                            {errors.name?.type === 'minLength' && "Please enter more than 3 character"}
                            {errors.name?.type === 'custom' && errors.name.message}
                            </p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email") } type="text"  placeholder="Enter email" ></Form.Control>
                            <p style={error}>
                            {errors.email?.type === 'required' && "Email is required"}
                            {errors.email?.type === 'maxLength' && "Do no enter more then 120 character"}
                            {errors.email?.type === 'pattern' && errors.email.message }
                            {errors.email?.type === 'custom' && errors.email.message}
                            </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control {...register("mobile") } type="text" placeholder="Enter mobile"></Form.Control>
                            <p style={error}>
                            {errors.name?.type === 'required' && "Mobile is required"}
                            {errors.name?.type === 'minLength' && "Please enter valid mobile number"}
                            {errors.mobile?.type === 'custom' && errors.mobile.message}
                            </p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control  {...register("message") } as="textarea" name="message" rows="3"></Form.Control>
                            <p style={error}>
                            {errors.message?.type === 'required' && "Message is required"}
                            {errors.message?.type === 'minLength' && "Please enter more than 10 character"}
                            {errors.message?.type === 'custom' && errors.message.message}
                            </p>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button variant="primary" type="submit">Submit</Button>{' '}
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <h4></h4>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14683.29871197191!2d72.5086395!3d23.06688835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1650445070288!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Contact;