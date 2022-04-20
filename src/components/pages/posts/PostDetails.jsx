import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const PostDetails = (post) => {
    
    const {id,title} = post.data;

    const url = `/posts/${id}`;
    
    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td className="text-center"><NavLink to={url}><Button size="sm"><FaEye /></Button></NavLink></td>
            </tr>
        </>
    );

}

export default PostDetails;