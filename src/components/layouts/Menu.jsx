import { Button } from "react-bootstrap";
import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";


const Menu = () => {

    const {user, logOut} = useUserContext();

    return(
        <>
        <Navbar bg="light" className="jumbotron">
           <Container>
                <Navbar.Brand href="/"><img width={130} src="/logo/logo1.png" /></Navbar.Brand>
                <Nav className="me-auto navbar sticky-top navbar-light bg-light">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about" >About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact" >Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users" >Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/posts" >Posts</NavLink>
                    </li>
                    {user.isLoggedIn && (
                        <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products" >Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/videosdk" >VideoSDK</NavLink>
                        </li>
                        </>
                    )}
                    {!user.isLoggedIn && (
                        <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop" >Shop</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cart" >Cart</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" >Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register" >Register</NavLink>
                        </li>
                        </>
                    )}
                </Nav>
                <Nav className="justify-content-end">
                    {user.isLoggedIn && (
                        <>  
                            <a className="nav-link">Hello, {user.name}</a>
                            <Button variant="link" onClick={logOut}>Logout</Button>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}
export default Menu;