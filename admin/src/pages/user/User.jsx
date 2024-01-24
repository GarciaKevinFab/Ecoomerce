import {
  AccountCircle,
  MailOutline,
  PermIdentity,
  Event,
} from "@material-ui/icons";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../../utils/config";
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./user.css";

export default function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    createdAt: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}users/${userId}`);
        console.log("Respuesta de la API:", res);

        // Los datos del usuario están en res.data.data
        const fetchedUser = res.data.data;
        setUser({
          username: fetchedUser.username || "",
          email: fetchedUser.email || "",
          role: fetchedUser.role || "",
          createdAt: fetchedUser.createdAt ? new Date(fetchedUser.createdAt).toLocaleDateString() : "",
        });
      } catch (err) {
        console.error(err);
        toast.error('Error al obtener datos del usuario');
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...user, password }; // Incluir la contraseña en el usuario actualizado
      await axios.put(`${BASE_URL}users/${userId}`, updatedUser);
      toast.success("Usuario actualizado con éxito");
      navigate('/users');
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar usuario");
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Usuario</h1>
        <Link to="/newUser">
          <button className="userAddButton">Crear</button>
        </Link>
      </div>

      <div className="userContainer">

        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Detalles de la Cuenta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <AccountCircle className="userShowIcon" />
              <span className="userShowInfoTitle">{user.role}</span>
            </div>
            <div className="userShowInfo">
              <Event className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Editar</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nombre de Usuario</label>
                <input
                  type="text"
                  name="username"
                  className="userUpdateInput"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Correo</label>
                <input
                  type="email"
                  name="email"
                  className="userUpdateInput"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="userUpdateInput"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="togglePasswordButton"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <div className="userUpdateItem">
                <label>Rol</label>
                <select
                  name="role"
                  className="userUpdateInput"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="userUpdateButton" type="submit">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}