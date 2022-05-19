import React from "react";
import "./index.scss";
import spotiLogo from "../../images/spoticlone-logo.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
      <div className="not-found-container">
          <div className="img-container">
            <img src={spotiLogo} alt="spoticloneLogo"></img>
          </div>
          <h1>404</h1>
          <h2>Página no encontrada</h2>
          <div className="button-to-principal">
            <button onClick={() => navigate("/list")} className="btn mt-5">
              Página principal
            </button>
          </div>
        </div>
  );
};

export default NotFound;
