import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.js";
import { removeUserStorage } from "../../utils/localStorage.js";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import theme from "../../palette/palette.js";

const SidebarBackoffice = () => {
  const authContext = useContext(AuthContext);

  const logOut = () => {
    authContext.setUser({});
    authContext.setUserRole("");
    removeUserStorage();
  };

  return (
    <div className="col-12 col-md-2 bg-dark">
      <Box sx={{ height: 1 }} className="sidebar-backoffice" id="sidebar">
        <nav aria-label="secondary mailbox folders">
          <List sx={{ color: theme.palette.secondary.light }}>
            <Link to="/backoffice/admin" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-lock"></i>
                  <ListItemText className="ps-2" primary="Admin" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/backoffice/roles" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-users"></i>
                  <ListItemText className="ps-2" primary="Roles" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/backoffice/users" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-user"></i>
                  <ListItemText className="ps-2" primary="Usuarios" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/backoffice/artists" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-university"></i>
                  <ListItemText className="ps-2" primary="Artistas" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/backoffice/songs" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-music"></i>
                  <ListItemText className="ps-2" primary="Canciones" />
                </ListItemButton>
              </ListItem>
            </Link>
            <hr />
            <Link to="/login" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link" onClick={logOut}>
                  <i className="fa fa-user-circle"></i>
                  <ListItemText className="ps-2" primary="Cerrar sesión" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
      </Box>
    </div>

    // <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark" style={{width: '250px'}}> <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> <svg className="bi me-2" width="40" height="32"> </svg> <span className="fs-4">SpotiClone</span> </Link>
    // <div className="col-4 vh-100 p-3 text-white bg-dark" style={{width: '250px'}}> <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> <svg className="bi me-2" width="40" height="32"> </svg> <span className="fs-4">SpotiClone</span> </Link>
    //   <hr />
    //   <ul className="nav nav-pills flex-column mb-auto">
    //       <li> <Link to="/backoffice/admin" className="nav-link text-white"> <i className="fa fa-user-o"></i><span className="ms-2">Admin</span> </Link> </li>
    //       <li> <Link to="/backoffice/roles" className="nav-link text-white"> <i className="fa fa-users"></i><span className="ms-2">Roles</span> </Link> </li>
    //       <li> <Link to="/backoffice/users" className="nav-link text-white"> <i className="fa fa-user"></i><span className="ms-2">Usuarios</span> </Link> </li>
    //       <li> <Link to="/backoffice/artists" className="nav-link text-white"> <i className="fa fa-university"></i><span className="ms-2">Artistas</span> </Link> </li>
    //       <li> <Link to="/backoffice/songs" className="nav-link text-white"> <i className="fa fa-music"></i><span className="ms-2">Canciones</span> </Link> </li>
    //   <hr />
    //       <li onClick={logOut}> <Link to="/login" className="nav-link text-white"> <i className="fa fa-user-circle" style={{fontSize: '2rem'}}></i><span className="ms-4" style={{fontSize: '1.2rem'}}>Cerrar sesión</span> </Link> </li>
    //   </ul>
    // </div>
  );
};

export default SidebarBackoffice;
