import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";
// import ProductList from "./ProductList";


export default function Products(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();
    const [deleted, setdeleted] = useState(true);
    const { user } = useUserContext(); 
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function getProducts(){
            const response = await axios.get(`${apiUrl}products`); 
            if(response.status===200){
                setProducts(response.data.data);
                SetLoading(false);   
            }
        }
        getProducts();
    }, [deleted, apiUrl]);

    if(loading){
        return(<Loader />);
    }

    if(!user.isLoggedIn){
        navigate('/login');
    }

    const willDelete = (id) =>{
        setdeleted(true)
        swal({
            title: "Are you sure?",
            text: "You want to delete this product?",
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    closeModal: true
                }
            }
        }).then((value) => {
            if(value){
                axios.post(`${apiUrl}/product/delete`, {id:id})
                .then(response => {
                    if(response.status === 200){
                        setdeleted(false)
                        swal("Deleted!", "Your product has been deleted!", "success");
                    }
                });
            }
        });
    }

    return(
        <>
        <Container>
            <NavLink to="/manage"><Button className="float-end mb-1">Add new</Button></NavLink>
            <h4>Products Listing</h4>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => {
                        // return (<ProductList data={product}/>)
                        const view = `/productDetails/${product.id}`;
                        const edit = `/manage/${product.id}`;
                        var imageName = '';
                        if(product.image){
                            imageName = apiUrl + product.image;
                        } else {
                            imageName = apiUrl + 'uploads/default.png';
                        }
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><Image centered="true" width="100" thumbnail="true" src={imageName}></Image></td>
                                <td><NavLink to={view}>{product.title}</NavLink></td>
                                <td>{product.price}</td>
                                <td>{product.qty}</td>
                                <td>
                                    <Button className="me-2" onClick={() => willDelete(product.id)}>Delete</Button>
                                    <NavLink to={edit}><Button className="me-2" >Edit</Button></NavLink>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
        </>
    )

}


