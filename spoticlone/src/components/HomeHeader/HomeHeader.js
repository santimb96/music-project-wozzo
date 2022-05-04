import React, { useContext } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { removeUserStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const HomeHeader = ({ onChangeText, isFocus }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = authContext.user;

  const onFocus = () => {
    isFocus(true);
  };

  const onBlur = () => {
    isFocus(false);
  };

  const logOut = () => {
    removeUserStorage();
    navigate('/login');
  };

  return (
    <div className="bg-dark header-home">
      {user && user._id === localStorage.getItem("userId") ? (
        
          <div className="dropdown auth-user">
            <button
              className="btn dropdown-toggle auth-drop"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Bienvenido, {user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {authContext.userRole === "admin" ? (
                <>
                <button className="dropdown-item"><Link to="/backoffice/roles">BO-Roles</Link></button>
                <button className="dropdown-item"><Link to="/backoffice/users">BO-Usuarios</Link></button>
                <button className="dropdown-item"><Link to="/backoffice/artists">BO-Artistas</Link></button>
                <button className="dropdown-item"><Link to="/backoffice/songs">BO-Canciones</Link></button>
                <hr></hr>
                <button onClick={logOut} className="dropdown-item"><i class="fa-solid fa-arrow-right-from-bracket pe-2"></i>Cerrar Sesión</button>  
                </>
              ) : (
                <button onClick={logOut} className="dropdown-item"><i class="fa-solid fa-arrow-right-from-bracket pe-2"></i>Cerrar Sesión</button>
              )}
            </div>
          </div>
       
      ) : (
        <div className="auth-fields">
          <button className="btn btn-auth">
            <Link to="/login">Iniciar sesión</Link>
          </button>
          <button className="btn btn-auth">
            <Link to="/register">Registrarse</Link>
          </button>
        </div>
      )}

      <div className="input-search-home-container d-flex justify-content-start">
        <input
          type="search"
          className="input-search-home"
          onChange={(e) => onChangeText(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Artistas o canciones"
        />
      </div>
    </div>
  );
};

export default HomeHeader;
