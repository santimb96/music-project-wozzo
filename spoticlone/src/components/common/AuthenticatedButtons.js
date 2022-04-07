import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUserStorage } from "../../utils/localStorage.js";


const AuthenticatedButtons = () => {

  const navigate = useNavigate();

  const logOut = () => {
    removeUserStorage();
    navigate('/login');
  }

  return (
    <form className="d-flex">
      <button onClick={logOut}  className="btn btn-outline-success m-2" type="submit">
        Cerrar sesión
      </button>
    </form>
  );
};

export default AuthenticatedButtons;