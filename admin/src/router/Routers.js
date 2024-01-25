import React from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute';
import Home from "../pages/home/Home";
import UserList from "../pages/userList/UserList";
import User from "../pages/user/User";
import NewUser from "../pages/newUser/NewUser";
import ProductList from "../pages/productList/ProductList";
import Product from "../pages/product/Product";
import NewProduct from "../pages/newProduct/NewProduct";

const Routers = () => {
    return (
        <Routes>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
            <Route path="/user/:userId" element={<ProtectedRoute><User /></ProtectedRoute>} />
            <Route path="/newUser" element={<ProtectedRoute><NewUser /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/product/:productId" element={<ProtectedRoute><Product /></ProtectedRoute>} />
            <Route path="/newproduct" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
        </Routes>
    );
}

export default Routers;
