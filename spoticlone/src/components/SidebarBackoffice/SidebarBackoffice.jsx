import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.js";
import { removeUserStorage } from "../../utils/localStorage.js";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import theme from "../../palette/palette.js";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./index.scss";

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
    if(!openSidebar){
      setOpenSidebar(true);
      sidebarRef.current.style.display = "grid";
      sidebarRef.current.style.width = "100%";
    } else {
      setOpenSidebar(false);
      sidebarRef.current.style.display = "none";
    }
  };

  return (
    <div className="col-12 col-md-2 bg-dark">
      <div className="d-flex justify-content-center">
        <button
          onClick={() => handleOpenSidebar()}
          className="btn hamburguer-button"
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <Box
        sx={{ height: 1 }}
        ref={sidebarRef}
        className="sidebar-backoffice"
        id="sidebar"
      >
        <nav aria-label="secondary mailbox folders">
          <List sx={{ color: theme.palette.secondary.light }}>
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

            <Link to="/backoffice/favouriteSongs" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa-solid fa-heart"></i>
                  <ListItemText className="ps-2" primary="Favourite songs" />
                </ListItemButton>
              </ListItem>
            </Link>
            <hr />
            <Link to="/list" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link" onClick={logOut}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
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

SidebarBackoffice.propTypes = {
  loading: PropTypes.bool,
};

export default SidebarBackoffice;
