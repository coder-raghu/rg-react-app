import React, { useState } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import Button from 'react-bootstrap/Button';

const Contact = (data) => {

    console.log(data);


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [contact, setContact] = useState({});

    const onSubmit = (data) =>{
        setContact(data);
        reset();
    } 

    const error = {
        color: "red",
    }

    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    { contact.name &&
                        <div className="submitted-record">
                            <div>Name: {contact.name}</div>
                            <div>Email: {contact.email}</div>
                            <div>Message: {contact.message}</div>
                        </div>
                    }

                    <h1 className="header">Contact form</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control {...register("name", { required: true, minLength: 3 })} type="name" placeholder="Enter name"></Form.Control>
                            <p style={error}>
                            {errors.name?.type === 'required' && "Name is required"}
                            {errors.name?.type === 'minLength' && "Please enter more than 3 character"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email", { required: true,maxLength: 120,  pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }})  } type="text"  placeholder="Enter email" ></Form.Control>
                            <p style={error}>
                            {errors.email?.type === 'required' && "Email is required"}
                            {errors.email?.type === 'maxLength' && "Do no enter more then 120 character"}
                            {errors.email?.type === 'pattern' && errors.email.message }
                            </p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control  {...register("message", {required:true, minLength: 10}) } as="textarea" name="message" rows="3"></Form.Control>
                            <p style={error}>
                            {errors.message?.type === 'required' && "Message is required"}
                            {errors.message?.type === 'minLength' && "Please enter more than 10 character"}
                            </p>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button variant="primary" type="submit">Submit</Button>{' '}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Contact;