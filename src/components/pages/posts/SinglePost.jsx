
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import Loader from "../../global/Loader";
import PostComments from "./PostComments";


const SinglePost = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const [loading, SetLoading] = useState(true);
    const [postDetails, SetPostDetails] = useState();
    const [buttonText, SetButtonText] = useState({'text':'Load comments', 'show': true});
    const [comments, SetComments] = useState();
    
    
    useEffect(() => {
        async function getPostDetails(){
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`); 
            if(response.status ===200){
                SetPostDetails(response.data);
                SetLoading(false);   
            } else if(response.status ===404){
                navigate('*');
            }
    
        }
        getPostDetails();

        return() => {
            // alert("I am going next page")
        }

    }, []);

    const loadComments =  async () => {
        SetButtonText({...buttonText, 'text':'Loading...'});
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`); 
        if(response.status ===200){
            SetComments(response.data);
            SetButtonText({ 'show':false});
        }
    }

    if(loading){
        return(<Loader />);
    }

    return(
        <>
          <Container>
            <Form className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control disabled  value={ postDetails.title }/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={ postDetails.body } rows="5"></Form.Control>
                </Form.Group>
            </Form>
            {/* <div>ID : { postDetails.id }</div> */}
            {/* <h2>Title : </h2>
            <p><strong>Description : </strong> </p> */}

            {buttonText.show && 
                <Button onClick={loadComments}>{buttonText.text}</Button>
            }
            {!buttonText.show && 
                <h4>Comments Listing</h4>
            }

            <ul>
                {comments && comments.map((comment) => {
                    return (
                        <PostComments data={comment} />
                    )
                })}
            </ul>
        </Container>  
        </>
    )

}

export default SinglePost;
