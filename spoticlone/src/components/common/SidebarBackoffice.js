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
        <Grid
          item
          xs={2}
          sx={{ bgcolor: theme.palette.primary.main }}
        >
          <Box sx={{height: "100vh"}}>
            <nav aria-label="secondary mailbox folders">
              <List sx={{ color: theme.palette.secondary.light }}>
                <ListItem disablePadding>
                  <ListItemButton className="nav-link">
                    <i className="fa fa-lock"></i>
                    <Link
                      to="/backoffice/admin"
                      className="nav-link"
                    >
                    <ListItemText primary="Admin" />
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton className="nav-link">
                    <i className="fa fa-users"></i>
                    <Link
                      to="/backoffice/roles"
                      className="nav-link"
                    >
                    <ListItemText primary="Roles" />
                    </Link>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton className="nav-link">
                    <i className="fa fa-user"></i>
                    <Link
                      to="/backoffice/users"
                      className="nav-link"
                    >
                    <ListItemText className=" " primary="Usuarios" />
                    </Link>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton className="nav-link">
                    <i className="fa fa-university"></i>
                    <Link
                      to="/backoffice/artists"
                      className="nav-link"
                    >
                    <ListItemText primary="Artistas" />
                    </Link>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton className="nav-link">
                    <i className="fa fa-music"></i>
                    <Link
                      to="/backoffice/songs"
                      className="nav-link"
                    >
                    <ListItemText primary="Canciones" />
                    </Link>
                  </ListItemButton>
                </ListItem>
                <hr />
                <ListItem disablePadding>
                  <ListItemButton className="nav-link" onClick={logOut}>
                    <i className="fa fa-user-circle"></i>
                    <Link to="/login" className="nav-link">
                      {" "}
                      <ListItemText   primary="Cerrar sesión" />
                    </Link>
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Grid>

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
