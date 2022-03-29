import { Button } from "react-bootstrap";
import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";


const Menu = () => {

    const {user, logOut} = useUserContext();

    return(
        <>
        <Navbar bg="light" variant="light">
           <Container>
                <Navbar.Brand href="#home">Shopie</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/" >Home</NavLink>
                    <NavLink className="nav-link" to="/about" >About</NavLink>
                    <NavLink className="nav-link" to="/contact" >Contact</NavLink>
                    <NavLink className="nav-link" to="/users" >Users</NavLink>
                    <NavLink className="nav-link" to="/posts" >Posts</NavLink>
                    {user.isLoggedIn && (
                        <NavLink className="nav-link" to="/products" >Products</NavLink>
                    )}
                    {!user.isLoggedIn && (
                        <>
                        <NavLink className="nav-link" to="/login" >Login</NavLink>
                        <NavLink className="nav-link" to="/register" >Register</NavLink>
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