import React from "react";
import { Send } from "@material-ui/icons";
import "./newsletter.css";

const Newsletter = () => {
  return (
    <div className="container-newsletter">
      <h1 className="title-newsletter">Suscribete</h1>
      <div className="desc-newsletter">Recibe actualizaciones oportunas de tus productos favoritos.</div>
      <div className="inputContainer-newsletter">
        <input className="input-newsletter" placeholder="Tu correo" />
        <button className="button-newsletter">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
