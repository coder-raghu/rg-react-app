import axios from "axios";
import { useState, useEffect } from "react"
import { Table, Container } from "react-bootstrap";
import PostDetails from './PostDetails';
import Loader from "../../global/Loader";

export default function Posts(){

    const [posts, SetPosts] = useState([]);
    const [loading, SetLoading] = useState(true);

    async function getPosts(){
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); 
        if(response.status ===200){
            SetPosts(response.data);
            SetLoading(false);   
        }
    }

    useEffect(() => {

        getPosts();

    }, [])
    
    if(loading){
        return(<Loader />);
    }

    return(
        <>
        <Container className="mt-3">
            <h4>Posts Listing</h4>
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.map((post) => {
                        return (
                            <PostDetails data={post} />
                        )
                    })}
                </tbody>
            </Table>
        </Container>
        </>
    )
}