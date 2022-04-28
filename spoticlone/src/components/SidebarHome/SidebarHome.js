import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.js";
import { removeUserStorage } from "../../utils/localStorage.js";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import theme from "../../palette/palette.js";
import { useState, useRef } from "react";
import spotiLogo from "../../images/spoticlone-logo.png";
import './index.scss';

const SidebarHome = () => {
  const authContext = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();
  const [found, setFound] = useState(false);
  const localUserId = localStorage.getItem("userId");
  const {_id} = typeof authContext.user.user !== 'undefined' ? authContext.user.user : {_id: ''};
  
  const logOut = () => {
    authContext.setUser({});
    authContext.setUserRole("");
    removeUserStorage();
  };

  useEffect(() => {
    localUserId === _id ? setFound(true) : setFound(false);
  }, []);

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
      <div className="d-flex justify-content-center">
      <header className="pt-3">
          <Link to="/">
            <div className="d-flex justify-content-center">
              <img
                src={spotiLogo}
                alt="spoticloneLogo"
                style={{ width: "30%" }}
              ></img>
            </div>
          </Link>
        </header>
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
            {/* <Link to="/" className="sidebar-link">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText className="ps-2 d-flex justify-content-center "><img src={spotiLogo} alt="spoticloneLogo" style={{width: '40%'}}></img></ListItemText>
                </ListItemButton>
              </ListItem>
            </Link> */}
            {/* {found ? (
              <>
                <hr />
                <Link to="/login" className="sidebar-link">
                  <ListItem disablePadding>
                    <ListItemButton className="nav-link" onClick={logOut}>
                      <i className="fa fa-user-circle"></i>
                      <ListItemText className="ps-2" primary="Cerrar sesión" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            ) : (
              ""
            )} */}
          </List>
        </nav>
      </Box>
    </div>
  );
};

export default SidebarHome;
