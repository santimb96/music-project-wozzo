import React, { useEffect, useState } from "react";
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
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [focus, setFocus] = useState(false);

  const getData = () => {
    Promise.all([getSongs(), getArtists()])
      .then(([songsResponse, artistsResponse]) => {
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
        setFilteredSongs(data);
      })
      .catch((err) => console.error(err));
  };
  
  useEffect(() => {
    getData();
  }, []);

  const onSelectSong = (index) => {
    setSelectedSong(filteredSongs[index]);
  }

 const onChangeText = (text) => {
   const filtered = songs?.filter((song) => {
     if (text[0] !== " " && (song.name
      .toLocaleLowerCase()
      .includes(text.toLocaleLowerCase().trim()) ||
      song.artistName
      .toLocaleLowerCase()
      .includes(text.toLocaleLowerCase().trim()))) {
        return true;
      }
      return false;
    });
    setFilteredSongs(filtered);
    setFilterText(text);
 }

  const isFocus = (value) => {
    setFocus(value);
  }

  const onChangeSong = (loop) => {
    if (loop === false) {
      const indexOfSong = filteredSongs.findIndex((s) => s._id === selectedSong?._id);
      const nextSong = indexOfSong === filteredSongs.length - 1 ? filteredSongs[0] : filteredSongs[indexOfSong + 1];
      setSelectedSong(nextSong)
    }
  };

  return (
    <div className="row home-page">
      <SidebarHome />
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="row">
          <HomeHeader onChangeText={onChangeText} isFocus={isFocus} />      
          <MediaList songs={filteredSongs} song={selectedSong} onSelectSong={onSelectSong} filterText={filterText} />
          {selectedSong?._id && <MediaPlayer song={selectedSong} onChangeSong={onChangeSong} focus={focus} />}  
        </div>
      </div>
    </div>
  );
};

export default Home;
