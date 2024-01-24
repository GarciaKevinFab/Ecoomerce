import {
  Instagram,
  MailOutline,
  Phone,
  Twitter,
} from "@material-ui/icons";
import './Footer.css'; // Importación de estilos CSS

const Footer = () => {
  return (
    <div className="Containers-footer">
      <div className="Left">
        <h1 className="Logo">TechMart.</h1>
        <p className="Desc">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className="SocialContainer">
          <div className="SocialIcon" style={{ backgroundColor: "#E4405F" }}>
            <Instagram />
          </div>
          <div className="SocialIcon" style={{ backgroundColor: "#55ACEE" }}>
            <Twitter />
          </div>
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
