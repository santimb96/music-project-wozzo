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
import { useState, useRef } from "react";

const SidebarBackoffice = () => {
  const authContext = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();

  const logOut = () => {
    authContext.setUser({});
    authContext.setUserRole("");
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
    <div className="col-12 col-md-2 bg-dark">
      <button
        onClick={() => handleOpenSidebar()}
        className="btn hamburguer-button"
      >
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
      <Box
        sx={{ height: 1 }}
        ref={sidebarRef}
        className="sidebar-backoffice"
        id="sidebar"
      >
        <nav aria-label="secondary mailbox folders">
          <List sx={{ color: theme.palette.secondary.light }}>
            <Link to="/" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-home"></i>
                  <ListItemText className="ps-2" primary="Página de inicio" />
                </ListItemButton>
              </ListItem>
            </Link>
            <hr />
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
  );
};

export default SidebarBackoffice;
