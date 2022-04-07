import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUserStorage } from "../../utils/localStorage.js";

const AuthenticatedButtons = () => {
  const navigate = useNavigate();

  const logOut = () => {
    removeUserStorage();
    navigate("/login");
  };

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item" onClick={logOut}>
        <p>Cerrar sesión</p>
      </li>
    </ul>
  );
};

export default AuthenticatedButtons;
