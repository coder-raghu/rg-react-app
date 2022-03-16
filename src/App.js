import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-notifications/lib/notifications.css';
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
// import Manage from './components/pages/products/Manage';
import AddEdit from './components/pages/products/AddEdit';
import SingleProduct from './components/pages/products/SingleProduct';
import { axios } from 'axios';
// import EditProduct from './components/pages/products/EditProduct';
// import httpsConfig from './config/https-config';



function App() {
    return ( 
        <>
        <Header />
        <Routes> 
            <Route exact path="/" element={ <Home /> } ></Route>
            <Route exact path="/about" element={ <About /> } ></Route>
            <Route exact path="/contact" element={ <Contact name="Vipul"/>} />
            <Route exact path="/users" element={ <Users />} />
            <Route exact path="/posts" element={ <Posts />} />
            <Route exact path="/posts/:id" element={ <SinglePost />} />
            <Route exact path="/products" element={ <Products />} />
            <Route exact path="/manage">
                <Route index path="/manage/" element={ <AddEdit />} />
                <Route exact path="/manage/:id" element={ <AddEdit />} />
            </Route>
            <Route exact path="/productDetails/:id" element={ <SingleProduct />} />
            {/* <Route exact path="/editProduct/:id" element={ <EditProduct />} /> */}
            <Route path="*" element={ <NoMatch />} />
        </Routes>
        <Footer />
        </>
    );
}

export default App;