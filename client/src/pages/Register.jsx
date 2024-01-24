import React from "react";
import "../Styles/register.css"; // Asegúrate de que la ruta al archivo CSS es correcta

const Register = () => {
  return (
    <div className="container-register">
      <div className="wrapper-register">
        <h1 className="title-register">Create an Account</h1>
        <form className="form-register">
          <input className="input-register" type="text" placeholder="Name" />
          <input className="input-register" type="text" placeholder="Last name" />
          <input className="input-register" type="text" placeholder="Username" />
          <input className="input-register" type="email" placeholder="Email" />
          <input className="input-register" type="password" placeholder="Password" />
          <input className="input-register" type="password" placeholder="Confirm password" />
          <span className="agreement-register">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>.
          </span>
          <button className="button-register">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
