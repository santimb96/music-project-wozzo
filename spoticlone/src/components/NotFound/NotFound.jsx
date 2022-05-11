import React from "react";
import "./index.scss";
import spotiLogo from "../../images/spoticlone-logo.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="row">
      <div className="col-12 not-found-container">
        <div className="text-light">
          <div className="d-flex justify-content-center mb-5">
            <img src={spotiLogo} alt="spoticloneLogo"></img>
          </div>
          <h1 className="text-center">404</h1>
          <h2 className="text-center">Página no encontrada</h2>
          <div className="d-flex justify-content-center">
            <button onClick={() => navigate("/")} className="btn mt-5">
              Página principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
