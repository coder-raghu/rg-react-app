import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import api from "../../../config/Api";
import Loader from "../../global/Loader";
import ProductList from "./ProductList";


export default function Products(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();

    async function getProducts(){
        const response = await axios.get('http://127.0.0.1:8000/api/products'); 
        if(response.status===200){
            setProducts(response.data.data);
            SetLoading(false);   
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    if(loading){
        return(<Loader />);
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
                        return (<ProductList data={product}/>)
                    })}
                </tbody>
            </Table>
        </Container>
        </>
    )

}


