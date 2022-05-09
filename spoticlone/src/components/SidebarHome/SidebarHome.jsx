import React, { useState, useRef } from "react";
import spotiLogo from "../../images/spoticlone-logo.png";
import { Link } from "react-router-dom";
import "./index.scss";

const SidebarHome = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();

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
      <div className="row header-responsive">
        <header className="col-12 pt-3 spotilogo d-flex justify-content-center">
          <img
            onClick={() => handleOpenSidebar()}
            src={spotiLogo}
            alt="spoticloneLogo"
          ></img>
        </header>
        <div className="sidebar-list">

            <Link to="/favourites">Favourites</Link>

        </div>
      </div>
    </div>
  );
};

export default SidebarHome;
