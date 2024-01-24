import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}users`);
        console.log("Usuarios obtenidos:", res.data);
        const usersData = res.data.data.map(user => ({
          ...user,
          id: user._id, // Esto es crucial para que DataGrid funcione correctamente
        }));
        setData(usersData);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      }
    };

    fetchUsers();
  }, []);



  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}users/${id}`); // Eliminar usuario del backend
      setData(data.filter((item) => item.id !== id)); // Actualizar estado local
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    // Asegúrate de que las siguientes propiedades coincidan con tu modelo de usuario
    {
      field: "username",
      headerName: "Nombre de Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Correo", width: 200 },
    { field: "role", headerName: "Rol", width: 120 },
    {
      field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="/newUser">
        <button className="AddButton">Crear Usuario</button>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5, 8, 10, 20]}
        checkboxSelection
      />

    </div>
  );
}
