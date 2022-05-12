import React, {useContext, useEffect, useState} from "react";
import FavouriteList from "../../components/FavouriteList/FavouriteList";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";
import MediaContext from "../../contexts/MediaContext";
import AuthContext from "../../contexts/AuthContext";
import { getUserFavSongs } from "../../services/favouriteSongs";
import { getSongs } from "../../services/songs";

import "./index.scss";
import { getArtists } from "../../services/artists";

const Favourites = () => {

  const { setSongList, favouriteList, setFavouriteList, setSongsFavList, songsFavList } = useContext(MediaContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if(favouriteList?.length !== songsFavList?.length){
    Promise.all([getSongs(), getArtists(), getUserFavSongs(user?._id)])
      .then(([songsResponse, artistsResponse, favSongsResponse]) => {
        const data = songsResponse.songs.map((song) => {
          const artist = artistsResponse.artists.find(
            (artist) => artist._id === song.artistId
          );
          return {
            ...song,
            artistName: artist.name,
          };
        });
        setSongList(data);
        setFavouriteList(favSongsResponse?.favouriteSongs);
        const formatted = favSongsResponse?.favouriteSongs.map((fav) => {
          return data.find((song) => song?._id === fav?.songId);
        });
        setSongsFavList(formatted);
      })
      .catch(err => console.warn(err))
      .finally(() => setLoading(false));
    }
  }, [favouriteList]);

  return (
    <div className="favourites-page">
     
        <FavouriteList loading={loading} />
      
    </div>
  );
};


export default Favourites;