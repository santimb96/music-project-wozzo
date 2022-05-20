import React, { useState, useRef, useContext } from "react";
// import spotiLogo from "../../images/spoticlone-logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { removeUserStorage } from "../../utils/localStorage";
import "./index.scss";

const Sidebar = () => {
  const { user, userRole } = useContext(AuthContext);
  const { setUser, setUserRole } = useContext(AuthContext);

  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();

  const logOut = () => {
    setUser(null);
    setUserRole("");
    removeUserStorage();
  };

  const handleOpenSidebar = () => {
    if (openSidebar) {
      sidebarRef.current.style.display = "none";
      setOpenSidebar(false);
    } else {
      sidebarRef.current.style.display = "grid";
      sidebarRef.current.style.width = "100%";
      setOpenSidebar(true);
    }
  };

  return (
    <div className="sidebar">
      <div className="header-responsive">
        <header className="pt-3 spotilogo ">
          <img
            onClick={() => handleOpenSidebar()}
            src="https://spoticlone.s3.eu-west-3.amazonaws.com/publicImg/spoticlone-logo(1).png"
            alt="spoticloneLogo"
          ></img>
        </header>
      </div>
      <div className="sidebar-page-title">
        <h1>Spoticlone</h1>
      </div>
      <div className="sidebar-list">
        <ul>
          {userRole === "user" && (
            <>
              <li>
                <i className="fa-solid fa-house"></i>
                <Link to="/list">Inicio</Link>
              </li>
              <hr />
            </>
          )}

          {user?._id &&
            userRole === "admin" &&
            window.location.pathname.includes("backoffice") && (
              <>
                <li>
                  <i className="fa fa-users"></i>
                  <Link to="/backoffice/roles">Roles</Link>
                </li>
                <li>
                  <i className="fa fa-user"></i>
                  <Link to="/backoffice/users">Usuarios</Link>
                </li>
                <li>
                  <i className="fa fa-university"></i>
                  <Link to="/backoffice/artists">Artists</Link>
                </li>
                <li>
                  <i className="fa fa-music"></i>
                  <Link to="/backoffice/songs">Canciones</Link>
                </li>
                <li>
                  <i className="fa-solid fa-heart"></i>
                  <Link to="/backoffice/favouriteSongs">Favoritos</Link>
                </li>
                <li>
                  <i class="fa-solid fa-record-vinyl"></i>
                  <Link to="/backoffice/genres">Géneros</Link>
                </li>
                <hr></hr>
                <li onClick={logOut}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <Link to="/list">Cerrar sesión</Link>
                </li>
              </>
            )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
