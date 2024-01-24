import React from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./product.css";

const Product = ({ item }) => {
  return (
    <div className="container-product">
      <div className="circle"></div>
      <img src={item.img} alt="" className="image-feed" />
      <div className="info">
        <div className="icon">
          <ShoppingCartOutlined />
        </div>
        <div className="icon">
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Product;
