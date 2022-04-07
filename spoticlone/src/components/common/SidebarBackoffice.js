import React from "react";
import { Link } from "react-router-dom";
import { removeUserStorage } from "../../utils/localStorage.js";

const SidebarBackoffice = () => {

  const logOut = () => removeUserStorage();

  return (
        <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark" style={{width: '250px'}}> <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> <svg className="bi me-2" width="40" height="32"> </svg> <span className="fs-4">SpotiClone</span> </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
              <li> <Link to="/backoffice/roles" className="nav-link text-white"> <i className="fa fa-users"></i><span className="ms-2">Roles</span> </Link> </li>
              <li> <Link to="/backoffice/users" className="nav-link text-white"> <i className="fa fa-user"></i><span className="ms-2">Usuarios</span> </Link> </li>
              <li> <Link to="/backoffice/artists" className="nav-link text-white"> <i className="fa fa-university"></i><span className="ms-2">Artistas</span> </Link> </li>
              <li> <Link to="/backoffice/songs" className="nav-link text-white"> <i className="fa fa-music"></i><span className="ms-2">Canciones</span> </Link> </li>
          <hr />
              <li onClick={logOut}> <Link to="/login" className="nav-link text-white"> <i className="fa fa-user-circle" style={{fontSize: '2rem'}}></i><span className="ms-4" style={{fontSize: '1.2rem'}}>Cerrar sesión</span> </Link> </li>
          </ul>
        </div>
  )
}

export default SidebarBackoffice;