import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../../global/Loader";
// import api from "../../../config/Api";
// import ProductList from "./ProductList";


export default function Products(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();
    const [deleted, setdeleted] = useState(true);

    async function getProducts(){
        const response = await axios.get('http://127.0.0.1:8000/api/products'); 
        if(response.status===200){
            setProducts(response.data.data);
            SetLoading(false);   
        }
    }

    useEffect(() => {
        getProducts();
    }, [deleted]);

    if(loading){
        return(<Loader />);
    }

    const willDelete = (id) =>{
        setdeleted(true)
        swal({
            title: "Are you sure?",
            text: "you want to delete this product?",
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        }).then((value) => {
            if(value){
                axios.post('http://127.0.0.1:8000/api/delete', {id:id})
                .then(response => {
                    if(response.status === 200){
                        setdeleted(false)
                        swal("Deleted!", "Your product has been deleted!", "success");
                        // navigate('/products');
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
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
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


