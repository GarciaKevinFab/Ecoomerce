import React from 'react';
import { Routes, Route } from "react-router-dom";
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
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
    );
}

export default Routers;
