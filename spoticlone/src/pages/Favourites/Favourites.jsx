import React, { useContext, useEffect } from "react";
import FavouriteList from "../../components/FavouriteList/FavouriteList";
import {getUserFavSongs} from "../../services/favouriteSongs";
import MediaContext from "../../contexts/MediaContext";
import AuthContext from "../../contexts/AuthContext";
import "./index.scss";

const Favourites = () => {
  const { setFavouriteList, favouriteList } = useContext(MediaContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="favourites-page">
      <FavouriteList />
    </div>
  );
};

export default Favourites;
