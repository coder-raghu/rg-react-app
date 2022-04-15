import { useState } from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";


export default function Cart(){

    const [loading, SetLoading] = useState(false);
    const { cart, deleteItem, cartTotal, item } = useCartContext();
    const { user } = useUserContext();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    console.log("item")
    console.log(item)

    if(loading){    
        return(<Loader />);
    }

    if(user.isLoggedIn){
        navigate('/login');
    }

    const removeProduct = (key) => {
        deleteItem(key);
        swal("Deleted!", "Your product has been deleted from cart!", "success");
    }

    return(
        <>
        <Container>
                <h4>Cart page</h4>
                {cart.length > 0 ? (
                    <>
                    <Table bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Price * Qty</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart && cart.map((product) => {
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
                                    <td>{product.price} * {product.qty}</td>
                                    <td>{product.price * product.qty}</td>
                                    <td>
                                        <Button onClick={()=>removeProduct(product.key)} className="me-2">Remove</Button>
                                    </td>
                                </tr>
                            )
                        })}
                        {cartTotal>0 && cart && (
                            <>
                            <tr>
                                <td colSpan={4}>SubTotla</td>
                                <td> { cartTotal } </td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Tax</td>
                                <td> 00.0 </td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Total</td>
                                <td> { cartTotal } </td>
                            </tr>
                            </>
                        )}
                    </tbody>
                </Table> </>) : (
                    <>
                    <h5 style={{ textAlign: 'center' }}>Your cart is empty.</h5>
                    <NavLink to="/shop"><Button>Go for shopping</Button></NavLink>
                    </>
                ) }
        </Container>
        </>
    )

}


