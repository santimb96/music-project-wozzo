import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const HomeHeader = ({setText}) => {
  //const authContext = useContext(AuthContext);
  const onChangeText = (value) => {
    setText(value);
  };

  return (
    <div className="bg-dark header-home">
      <div className="input-search-home-container d-flex justify-content-start">
        <input type="search" className="input-search-home" onChange={(e) => onChangeText(e.target.value)} placeholder="Artistas o canciones" />
      </div>
    </div>
  );
};

export default HomeHeader;
