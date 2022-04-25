import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import MediaList from "../components/MediaList";
import SidebarHome from "../components/common/SidebarHome";
import HomeHeader from "../components/HomeHeader";
import { getSongs } from "../services/songs";
import { getArtists } from "../services/artists";

const Home = () => {

  const [filterText, setFilterText] = useState("");

  const [songs, setSongs] = useState(null);
  const [artists, setArtists] = useState(null);

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
            artistName: artist.name,
          };
        });
        setSongs(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, [])

  console.log(songs, artists);


  return (
    <div className="row home-page">
      <SidebarHome />
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="row">
          <HomeHeader setText={setText} />      
          <MediaList songs={songs} artists={artists} filter={filterText} />    
        </div>
      </div>
    </div>
  );
};

export default Home;
