import React, { useEffect, useState } from "react";
import { Add, Remove, DeleteOutline } from "@material-ui/icons"; // Importar el ícono DeleteOutline
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/cart.css";
import { increaseQuantity, decreaseQuantity, removeProduct } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  const itemCount = cart.products.length;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/checkout/payment`, {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (error) {
        console.error("Payment error:", error);
      }
    };
    if (stripeToken) makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <div className="container-cart">
      <div className="wrapper-cart">
        <h1 className="title">Tu Carrito</h1>
        <div className="top">
          <button className="topButton">Continua Comprando</button>
          <div className="topTexts">
            <span className="topText">Bolsa de compras({itemCount})</span>
          </div>
          <button className="topButton topButton-filled">COMPRAR AHORA</button>
        </div>
        <div className="bottom">
          <div className="info-cart">
            {cart.products.map((product) => (
              <div className="product" key={product._id}>
                <div className="productDetail">
                  <img src={product.img} className="image-cart" alt={product.title} />
                  <div className="details">
                    <span className="productName">
                      <b>Producto:</b> {product.title}
                    </span>
                    <span className="productBrand">
                      <b>Marca:</b> {product.brand}
                    </span>
                    <span className="productModel">
                      <b>Modelo:</b> {product.model}
                    </span>
                  </div>
                </div>
                <div className="priceDetail">
                  <div className="productAmountContainer">
                    <Add onClick={() => handleIncrease(product._id)} />
                    <div className="productAmount">{product.quantity}</div>
                    <Remove onClick={() => handleDecrease(product._id)} />
                    <DeleteOutline
                      onClick={() => handleRemove(product._id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="productPrice">S/. {product.price * product.quantity}</div>
                </div>
              </div>
            ))}
            <hr className="hr" />
          </div>
          <div className="summary">
            <h1 className="summaryTitle">RESUMEN DEL PEDIDO</h1>
            <div className="summaryItem">
              <span className="summaryItemText">Subtotal</span>
              <span className="summaryItemPrice">S/.{cart.total}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">S/. 5.90</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">S/.-5.90</span>
            </div>
            <div className="summaryItem summaryItem-total">
              <span className="summaryItemText">Total</span>
              <span className="summaryItemPrice">S/. {cart.total}</span>
            </div>
            <StripeCheckout
              name="TechMart."
              image="https://raw.seadn.io/files/315e3178c58cb23e33fe6688c9ba021c.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button className="button">COMPRAR AHORA</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
