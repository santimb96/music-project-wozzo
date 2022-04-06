import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-bg-color">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Spoticlone
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-link-auth" aria-current="page">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/backoffice/admin"
                className="nav-link nav-link-auth"
                aria-current="page"
              >
                Admin
              </Link>
            </li>
          </ul>
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
