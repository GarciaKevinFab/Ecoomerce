import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";

  return (
    <div className={sidebarClass}>

      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/home" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analítica
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Alcance
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menú rápido</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Usuarios
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Productos
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Ventas
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Informes
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notificaciones</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Correo
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Reseñas
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Mensajes
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Personal</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Administrar
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analíticas
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reportes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
