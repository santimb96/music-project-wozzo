import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.js";
import { removeUserStorage } from "../../utils/localStorage.js";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import theme from "../../palette/palette.js";
import { useState, useRef } from "react";
import spotiLogo from "../../images/spoticlone-logo.png";
import "./index.scss";
import { ListItem } from "@mui/material";

const SidebarHome = () => {
  const authContext = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();
  const [found, setFound] = useState(false);
  const localUserId = localStorage.getItem("userId");
  const { _id } =
    typeof authContext.user.user !== "undefined"
      ? authContext.user.user
      : { _id: "" };

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
      <div className="row header-responsive">
        <header className="col-12 pt-3 spotilogo d-flex justify-content-center">  
            <img onClick={() => handleOpenSidebar()} src={spotiLogo} alt="spoticloneLogo"></img>
        </header>
      </div>
{/* 
      <div ref={sidebarRef} className="row">
        <div className="col-12 d-flex flex-column">
        <div class="card" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        </div>
      </div> */}
        
    </div>
  );
};

export default SidebarHome;
