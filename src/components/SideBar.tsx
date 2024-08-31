import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slice/loginSlice";
import "../css/SideBar.css"; // Assicurati di avere questo file CSS nella tua cartella dei componenti

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect alla pagina di login o alla home page dopo il logout
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/main" className="sidebar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className="sidebar-link">
              Ricette
            </Link>
          </li>
          <li>
            <Link to="/contact" className="sidebar-link">
              Trova ricetta
            </Link>
          </li>
          <li>
            <button className="sidebar-link bt" onClick={handleLogout}>
              Logout
            </button>
          </li>
          <li>
            <Link to="/register" className="sidebar-link">
              Registrati
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
