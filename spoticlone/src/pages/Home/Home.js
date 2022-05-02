import React, { useEffect, useState, useRef } from "react";
import MediaList from "../../components/MediaList/MediaList";
import SidebarHome from "../../components/SidebarHome/SidebarHome";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import { getSongs } from "../../services/songs";
import { getArtists } from "../../services/artists";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import './index.scss';


const Home = () => {

  const [filterText, setFilterText] = useState("");

  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
  const [songIndex, setSongIndex] = useState(null);
  const [next, setNext] = useState(false);
  const [focus, setFocus] = useState(false);

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

  const itemSelected = (item, index) => {
    setSongIndex(index);
    setSelectedSong(!item ? [] : item);
    setNext(false);
  }

  const nextSong = () => {
    setNext(true);
  }

  const isFocus = (value) => {
    setFocus(value);
  }

  return (
    <div className="row home-page">
      <SidebarHome />
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="row">
          <HomeHeader setText={setText} isFocus={isFocus} />      
          <MediaList songs={songs} filter={filterText} itemSelected={itemSelected} next={next} selectedSong={selectedSong} />
          {selectedSong.length === 0 ? '' : <MediaPlayer song={selectedSong} nextSong={nextSong} focus={focus} />}    
        </div>
      </div>
    </div>
  );
};

export default Home;
