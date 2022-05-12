import React, { useContext } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import AuthContext, { MODAL_STATES } from "../../contexts/AuthContext";
import { removeUserStorage } from "../../utils/localStorage";

const HomeHeader = () => {
  const {
    user,
    setUser,
    setUserRole,
    userRole,
    setShowAuthModal,
    setAuthModalType,
  } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    setUserRole("");
    removeUserStorage();
  };

  return (
    <div className="bg-dark header-home">
      {user?._id && (
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
            {userRole === "admin" && (
              <>
                {(window.location.pathname.includes("backoffice") ||
                  window.location.pathname.includes("favourites")) && (
                  <>
                    <button className="dropdown-item">
                      <Link to="/">Inicio</Link>
                    </button>
                  </>
                )}
                <button className="dropdown-item">
                  <Link to="/favourites">Favoritos</Link>
                </button>
                <hr></hr>
                <button className="dropdown-item">
                  <Link to="/backoffice/roles">BO-Roles</Link>
                </button>
                <button className="dropdown-item">
                  <Link to="/backoffice/users">BO-Usuarios</Link>
                </button>
                <button className="dropdown-item">
                  <Link to="/backoffice/artists">BO-Artistas</Link>
                </button>
                <button className="dropdown-item">
                  <Link to="/backoffice/songs">BO-Canciones</Link>
                </button>
                <button className="dropdown-item">
                  <Link to="/backoffice/favouriteSongs">BO-Canciones Fav</Link>
                </button>
                <hr></hr>
              </>
            )}
            <button onClick={logOut} className="dropdown-item">
              <i className="fa-solid fa-arrow-right-from-bracket pe-2"></i>Cerrar
              Sesión
            </button>
          </div>
        </div>
      )}
      {!user?._id && (
        <div className="auth-fields">
          <button
            onClick={() => {
              setShowAuthModal(true);
              setAuthModalType(MODAL_STATES.LOGIN);
            }}
            className="btn btn-auth"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => {
              setShowAuthModal(true);
              setAuthModalType(MODAL_STATES.REGISTER);
            }}
            className="btn btn-auth"
          >
            Registrarse
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
