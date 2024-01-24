import React from "react";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.products);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="containers-navbar">
      <div className="wrapper">
        <div className="left">
          <div className="searchContainer">
            <input className="input" placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </div>
        </div>
        <div className="center">
          <h1 className="logo">TechMart.</h1>
        </div>
        <div className="right">
          <div className="menuItem">
            <Link to="/register">REGISTRAR</Link>
          </div>
          <div className="menuItem">
            <Link to="/login">LOGIN</Link>
          </div>
          <Link to="/cart">
            <div className="menuItem">
              <Badge badgeContent={totalQuantity} color="primary" overlap="rectangular">
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
