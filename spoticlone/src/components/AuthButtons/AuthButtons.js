import React from "react";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link
          to="/login"
          className="nav-link nav-link-auth"
          aria-current="page"
        >
          Iniciar Sesión
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/register"
          className="nav-link nav-link-auth"
          aria-current="page"
        >
          Registrarse
        </Link>
      </li>
    </ul>
  );
};

export default AuthButtons;
