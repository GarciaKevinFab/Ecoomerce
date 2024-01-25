import React from "react";
import { MailOutline, Phone, Twitter } from "@material-ui/icons";
import './footer.css';

const Footer = () => {
  return (
    <div className="Containers-footer">
      <div className="Left">
        <h1 className="Logo">TechMart.</h1>
        <p className="Desc">
          TechMart es tu destino de confianza para lo último en tecnología y gadgets.
          Garantizamos que siempre estés a un clic de encontrar exactamente lo
          que necesitas.
        </p>
        <div className="SocialContainer">
          <a href="https://twitter.com/GarciaKevinFab" target="_blank" rel="noopener noreferrer" className="SocialIcon" style={{ backgroundColor: "#55ACEE" }}>
            <Twitter />
          </a>
        </div>
      </div>
      <div className="Center">
        <h3 className="Title">Enlaces útiles</h3>
        <ul className="List">
          <li className="ListItem">Inicio</li>
          <li className="ListItem">Carrito</li>
          <li className="ListItem">Laptops</li>
          <li className="ListItem">Celulares</li>
          <li className="ListItem">Accesorios</li>
          <li className="ListItem">Pc Gamer</li>
          <li className="ListItem">Terminos & Condiciones</li>
        </ul>
      </div>
      <div className="Right">
        <h3 className="Title">Contacto</h3>
        <div className="ContactItem">
          <Phone style={{ marginRight: "10px" }} /> +51 940394404
        </div>
        <div className="ContactItem">
          <MailOutline style={{ marginRight: "10px" }} /> Kevinfge2410@gmail.com
        </div>
        <img className="Payment" src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment Methods" />
      </div>
    </div>
  );
};

export default Footer;
