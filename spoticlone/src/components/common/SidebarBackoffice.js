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
            <Link to="/" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton className="nav-link">
                  <i className="fa fa-home"></i>
                  <ListItemText className="ps-2" primary="Página de inicio" />
                </ListItemButton>
              </ListItem>
            </Link>
            <hr />
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
  );
};

export default SidebarBackoffice;
