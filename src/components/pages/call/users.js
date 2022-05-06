import { ListGroup } from "react-bootstrap";


const users = (data) => {
   
    const {userID, name}  = data.data;

    return(
        <>
            <ListGroup.Item key={userID}>{name}</ListGroup.Item>
        </>
    )
}

export default users;