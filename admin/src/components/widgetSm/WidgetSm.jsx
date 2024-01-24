import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import axios from 'axios';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}users/?new=true`);
        setUsers(res.data.data); // Cambio aquí
      } catch (error) {
        console.error("Error fetching new users:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nuevos miembros</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>

            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
