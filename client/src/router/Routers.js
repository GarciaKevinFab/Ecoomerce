import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Product from "../pages/Product";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Success from "../pages/Success";

const Routers = () => {
    return (

        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>

    );
};

export default Routers;
