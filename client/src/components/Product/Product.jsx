import React from "react";
import { ShoppingCartOutlined, SearchOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import { toast } from 'react-toastify';
import "./product.css";

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    toast.success("Producto añadido al carrito!");
  };

  return (
    <div className="container-product">
      <div className="circle"></div>
      <img src={item.img} alt="" className="image-feed" />
      <div className="info">
        <div className="icon" onClick={handleClick}>
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
