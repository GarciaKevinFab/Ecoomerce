import React, { useState, useContext } from "react";
import { Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/register.css';
import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleClick = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (res.status === 400) {
        toast.error(result.message);
      } else if (!res.ok) {
        toast.error("El nombre de usuario o correo electrónico ya existen.");
      } else {
        dispatch({ type: "REGISTER_SUCCESS" });
        navigate("/login");
      }

    } catch (err) {
      toast.error("Ha ocurrido un error. Por favor intente de nuevo.");
    }
  };


  return (
    <div className="container-register">
      <div className="wrapper-register">
        <h2 className="title-register">Registrarte</h2>

        <Form onSubmit={handleClick} className="form-register">
          <FormGroup>
            <input type="text" placeholder="Nombre de Usuario" required id="username"
              onChange={handleChange} className="input-register" />
          </FormGroup>
          <FormGroup>
            <input type="email" placeholder="Email" required id="email"
              onChange={handleChange} className="input-register" />
          </FormGroup>
          <FormGroup className="position-relative">
            <input type={passwordShown ? "text" : "password"} placeholder="Contraseña" required id="password" onChange={handleChange} className="input-register" />
            <i onClick={togglePasswordVisibility} className="position-absolute top-50 end-0 translate-middle-y" style={{ cursor: 'pointer', marginRight: '10px' }}>{passwordShown ? <FaEye /> : <FaEyeSlash />}</i>
          </FormGroup>

          <Button className="button-register" type="submit">
            Registrarte
          </Button>
        </Form>
        <p className="agreement-register">¿Ya tienes una cuenta? <Link to='/login'>Ingresar</Link></p>
      </div>
    </div>
  );
};

export default Register;