import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const PostDetails = (post) => {
    
    const {id,title} = post.data;

    const url = `/posts/${id}`;
    
    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td><NavLink to={url}><Button>View</Button></NavLink></td>
            </tr>
        </>
    );

}

export default PostDetails;