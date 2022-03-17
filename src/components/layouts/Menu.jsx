import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const Menu = () => {
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
                    <NavLink className="nav-link" to="/products" >Products</NavLink>
                    <NavLink className="nav-link" to="/login" >Login</NavLink>
                    <NavLink className="nav-link" to="/register" >Register</NavLink>
                    <NavLink className="nav-link" to="/logout" >Logout</NavLink>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}
export default Menu;