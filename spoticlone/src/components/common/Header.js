import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AuthButtons from "./AuthButtons";
import AuthenticatedButtons from "./AuthenticatedButtons";

const Header = () => {
  const auth = useContext(AuthContext);

  const [found, setFound] = useState(false);
  const localUserId = localStorage.getItem("userId");

  useEffect(() => {
    localUserId ? setFound(true): setFound(false); 
  }, [localUserId]);

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
              <Link
                to="/"
                className="nav-link nav-link-auth"
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/backoffice/roles"
                className="nav-link nav-link-auth"
                aria-current="page"
              >
                Admin
              </Link>
            </li>
            {found ? <AuthenticatedButtons /> : <AuthButtons /> }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
