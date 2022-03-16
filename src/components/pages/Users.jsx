import UserDetails from './UserDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import Loader from '../global/Loader';


export default function Users(){

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);

    async function getUsers(){
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            if(response.status===200){
                setLoading(false);
                setUsers(response.data);
            }
        } catch (error) {
            setLoading(false);
            console.log("my error is "+ error);
        }
        
        
    }

    useEffect(() => {
        getUsers();
    }, []);

    if(loading){
        return(<Loader />);
    }

    return (
        <>
        <Container>
            <h4>Users Listing</h4>
            <Table responsive bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>phone</th>
                    </tr>
                </thead>
                <tbody>
                    { users && users.map((user) => {
                        return (
                            <UserDetails data={user}/>
                        )
                    }) }
                </tbody>
            </Table>
        </Container>
        </>
    );
}