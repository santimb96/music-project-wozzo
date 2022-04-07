import React from "react";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <form className="d-flex">
      <button className="btn btn-outline-success m-2" type="submit">
        <Link
          to="/login"
          className="nav-link nav-link-auth"
          aria-current="page"
        >
          Iniciar sesión
        </Link>{" "}
      </button>
      <button className="btn btn-outline-success m-2" type="submit">
        <Link
          to="/register"
          className="nav-link nav-link-auth"
          aria-current="page"
        >
          Registrarse
        </Link>
      </button>
    </form>
  );
};

export default AuthButtons;
