import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NotificationsNone, Language, Settings, Menu } from "@material-ui/icons";
import "./topbar.css";

export default function Topbar({ toggleSidebar }) {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarIconContainer" onClick={toggleSidebar}>
          <Menu />
        </div>
        <div className="topLeft">
          <span className="logo">TechMart</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>

          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button onClick={logout} className="logoutButton">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="loginButton">Acceder</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
