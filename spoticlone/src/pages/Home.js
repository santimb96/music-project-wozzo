import React, { useEffect, useState } from "react";
import MediaList from "../components/MediaList/MediaList";
import SidebarHome from "../components/SidebarHome/SidebarHome";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import { getSongs } from "../services/songs";
import { getArtists } from "../services/artists";
import MediaPlayer from "../components/MediaPlayer/MediaPlayer";

const Home = () => {

  const [filterText, setFilterText] = useState("");

  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songSelected, setSongSelected] = useState({});

  const setText = (value) => {
    setFilterText(value); 
  }

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
            artistName: artist.name
          };
        });
        setSongs(data);
      })
      .catch((err) => console.error(err));
  };
  
  useEffect(() => {
    getData();
  }, [])

  const itemSelected = (item) => {
    setSongSelected(item);
  }

  return (
    <div className="row home-page">
      <SidebarHome />
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="row">
          <HomeHeader setText={setText} />      
          <MediaList songs={songs} filter={filterText} itemSelected={itemSelected} />
          <MediaPlayer song={songSelected} />    
        </div>
      </div>
    </div>
  );
};

export default Home;
