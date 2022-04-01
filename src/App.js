import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import Header from './components/layouts/Header';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Users from './components/pages/Users';
import Posts from './components/pages/posts/Posts';
import SinglePost from './components/pages/posts/SinglePost';
import Footer from './components/layouts/Footer';
import NoMatch from './components/pages/NoMatch';
import Products from './components/pages/products/Products';
import AddEdit from './components/pages/products/AddEdit';
import SingleProduct from './components/pages/products/SingleProduct';
import Register from './components/auth/Register';
import Login from './components/auth/login';
import { UserContextProvider } from './components/context/userContext';
import Call from './components/pages/call/Call';
import { CartContextProvider } from './components/context/cartContext';
import Shop from './components/pages/products/shop';
import Cart from './components/pages/shop/cart';

function App() {
    return ( 
        <>
        <UserContextProvider>
        <CartContextProvider>
        <Header />
        <Routes> 
            <Route exact path="/" element={ <Home /> } ></Route>
            <Route exact path="/about" element={ <About /> } ></Route>
            <Route exact path="/contact" element={ <Contact name="Vipul"/>} />
            <Route exact path="/users" element={ <Users />} />
            <Route exact path="/posts" element={ <Posts />} />
            <Route exact path="/posts/:id" element={ <SinglePost />} />
            <Route exact path="/products" element={ <Products />} />
            <Route exact path="/shop" element={ <Shop />} />
            <Route exact path="/cart" element={ <Cart />} />
            <Route exact path="/videosdk" element={ <Call />} />
            <Route exact path="/manage">
                <Route index path="/manage/" element={ <AddEdit />} />
                <Route exact path="/manage/:id" element={ <AddEdit />} />
            </Route>
            <Route exact path="/productDetails/:id" element={ <SingleProduct />} />
            <Route exact path="/register" element={ <Register />} />
            <Route exact path="/login" element={ <Login />} />
            <Route path="*" element={ <NoMatch />} />
        </Routes>
        <Footer />
        </CartContextProvider>
        </UserContextProvider>
        </>
    );
}

export default App;