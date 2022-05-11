import React, {useContext, useEffect, useState} from "react";
import FavouriteList from "../../components/FavouriteList/FavouriteList";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";
import MediaContext from "../../contexts/MediaContext";
import AuthContext from "../../contexts/AuthContext";
import { getUserFavSongs } from "../../services/favouriteSongs";
import { getSongs } from "../../services/songs";

import "./index.scss";

const Favourites = () => {

  const { songList, setSongList, favouriteList, setFavouriteList } = useContext(MediaContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [songsFavList, setSongsFavList] = useState([]);	// list of favourite songs

  
  useEffect(() => {
    setLoading(true);
    if(!favouriteList?.length){
    Promise.all([getSongs(), getUserFavSongs(user?._id)])
      .then(([songsResponse, favSongsResponse]) => {
        setSongList(songsResponse?.songs);
        setFavouriteList(favSongsResponse?.favouriteSongs);
      })
      .catch(err => console.warn(err))
    }

    const formatted = favouriteList?.map((fav) => {
      return songList?.find((song) => song?._id === fav?.songId);
    });
    setLoading(false);
    setSongsFavList(formatted);
  }, [favouriteList]);

  return (
    <div className="favourites-page">
      {songsFavList?.length === 0 ? (
        <NoResultsFound msg={<h2 className="text-light">No se han encontrado favoritos</h2>} />
      ) : (
        <FavouriteList loading={loading} songsFavList={songsFavList} />
      )}
    </div>
  );
};

export default Favourites;
