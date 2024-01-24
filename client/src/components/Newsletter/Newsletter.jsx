import React from "react";
import { Send } from "@material-ui/icons";
import "./newsletter.css";

const Newsletter = () => {
  return (
    <div className="container-newsletter">
      <h1 className="title">Suscribete</h1>
      <div className="desc">Recibe actualizaciones oportunas de tus productos favoritos.</div>
      <div className="inputContainer">
        <input className="input" placeholder="Tu correo" />
        <button className="button">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
