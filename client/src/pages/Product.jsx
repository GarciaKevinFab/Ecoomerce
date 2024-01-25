import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Add, Remove } from "@material-ui/icons";
import Newsletter from "../components/Newsletter/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { BASE_URL } from "../utils/config";
import { toast } from 'react-toastify';
import axios from 'axios';
import '../Styles/product.css';

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
    toast.success("Producto añadido al carrito!");
  };

  return (
    <div className="container">
      <div className="product-wrapper">
        <div className="product-image-container">
          <img src={product.img} alt="" className="product-image" />
        </div>
        <div className="product-info-container">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.desc}</p>
          <span className="product-price">S/. {product.price}</span>

          <div className="product-details">
            {product.categories?.length > 0 && (
              <div className="product-detail-item">
                <span className="detail-title">
                  <b>Categoria:</b>
                </span>
                <ul className="product-details-list">
                  {product.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.brand && (
              <div className="product-detail-item">
                <span className="detail-title">
                  <b>Marca:</b>
                </span> {product.brand}
              </div>
            )}

            {product.model && (
              <div className="product-detail-item">
                <span className="detail-title">
                  <b>Modelo:</b>
                </span> {product.model}
              </div>
            )}

            <div className="product-detail-item">
              <span className="detail-title">
                <b>En Stock:</b>
              </span> {product.inStock > 0 ? 'Si' : 'No'}
            </div>
          </div>

          <div className="product-add-to-cart-section">
            <div className="quantity-modifier">
              <Remove onClick={() => handleQuantity("dec")} />
              <span className="quantity-number">{quantity}</span>
              <Add onClick={() => handleQuantity("inc")} />
            </div>
            <button className="add-to-cart-button" onClick={handleClick}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
      <Newsletter />

    </div>
  );
};

export default Product;
