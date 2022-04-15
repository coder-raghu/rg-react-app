
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
            <NavLink to="/posts">Back</NavLink>
            
            <div>ID : { postDetails.id }</div>
            <h2>Title : { postDetails.title }</h2>
            <p><strong>Description : </strong> { postDetails.body }</p>

            {buttonText.show && 
                <button onClick={loadComments}>{buttonText.text}</button>
            }
            {!buttonText.show && 
                <h3>Comments Listing</h3>
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
