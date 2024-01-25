import React, { useState } from "react";
import axios from 'axios';
import "./newUser.css";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function NewUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}auth/register`, user);
      toast.success("Usuario creado con éxito");
      console.log(res.data);
      setTimeout(() => navigate('/users'), 2000);
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message || "Error al crear el usuario";
        toast.error(message);
      } else {
        toast.error("Error al conectar con el servidor");
      }
      console.error(err);
    }
  };


  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo Usuario</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Nombre de Usuario</label>
          <input type="text" name="username" placeholder="nombre de usuario" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" placeholder="email@gmail.com" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Contraseña</label>
          <input type="password" name="password" placeholder="cotraseña" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Rol</label>
          <select name="role" onChange={handleChange}>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="newUserButton" type="submit">Crear</button>
      </form>
    </div>
  );
}
