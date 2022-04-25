import { getAccordionDetailsUtilityClass, getCardActionAreaUtilityClass } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MediaContext from "../contexts/MediaContext";
import { getSongs } from "../services/songs";
import { getArtists } from "../services/artists";

const MediaList = () => {
  
  const [songs, setSongs] = useState(null);
  const [artists, setArtists] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);

  const getData = () => {
    Promise.all([getSongs(), getArtists()])
      .then(([songsResponse, artistsResponse]) => {
        setArtists(artistsResponse.artists);
        const data = songsResponse.songs.map((song) => {
          const artist = artistsResponse.artists.find(
            (artist) => artist._id === song.artistId
          );
          return {
            ...song,
            artistName: artist.name,
          };
        });
        setSongs(data);
      })
      .catch((err) => console.warn(err));
  }

  useEffect(() => {
    getData();
  },[]);
  
  
  
  return (
    <div></div>
  );
};

export default MediaList;
