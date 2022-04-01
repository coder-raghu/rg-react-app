import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import Loader from "../../global/Loader";


export default function Cart(){

    const [loading, SetLoading] = useState(true);
    const { cart, addItem } = useCartContext();
    const [products, setProducts] = useState();
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
    }, []);

    if(loading){
        return(<Loader />);
    }

    // console.log("first My");
    // console.log(cart);

    return(
        <>
        <Container>
                <h4>I am cart page</h4>
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
                    {cart && cart.map((product) => {
                        console.log(product)
                        const view = `/productDetails/${product.id}`;
                        var imageName = '';
                        if(product.image){
                            imageName = apiUrl + product.image;
                        } else {
                            imageName = apiUrl + 'uploads/default.png';
                        }
                        return (
                            <tr key={product.id}>
                                <td><Image centered="true" width="100" thumbnail="true" src={imageName}></Image></td>
                                <td><NavLink to={view}>{product.title}</NavLink></td>
                                <td>{product.price}</td>
                                <td>{product.qty}</td>
                                <td>
                                    <NavLink to="/"><Button className="me-2">Remove</Button></NavLink>
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


