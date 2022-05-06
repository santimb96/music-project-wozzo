import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import MediaList from "../../components/MediaList/MediaList";
import SidebarHome from "../../components/SidebarHome/SidebarHome";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import { getSongs } from "../../services/songs";
import { getArtists } from "../../services/artists";
import { getFavSong } from "../../services/favouriteSongs";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import './index.scss';
import AuthModal from "../../components/AuthModal/AuthModal";

const Home = () => {
  const authContext = useContext(AuthContext);
  const {user} = authContext;

  const [filterText, setFilterText] = useState("");

  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [focus, setFocus] = useState(false);

  const getData = () => {
    Promise.all([getSongs(), getArtists(), getFavSong()])
      .then(([songsResponse, artistsResponse, favouriteSongsResponse]) => {
        const data = songsResponse.songs.map((song) => {
          const artist = artistsResponse.artists.find(
            (artist) => artist._id === song.artistId
          );
          const favSong = favouriteSongsResponse.favouriteSong.find(fav => fav.songId === song._id && fav.userId === user?._id);
          return {
            ...song,
            artistName: artist.name,
            favSong: favSong ? true : false,
          };
        });
        setSongs(data);
        setFilteredSongs(data);
      })
      .catch((err) => console.error(err));
  };
  
  useEffect(() => {
    getData();
  }, [user]);

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

  const goToNext = (loop) => {
    if (loop === false) {
      const indexOfSong = filteredSongs.findIndex((s) => s._id === selectedSong?._id);
      const nextSong = indexOfSong === filteredSongs.length - 1 ? filteredSongs[0] : filteredSongs[indexOfSong + 1];
      setSelectedSong(nextSong)
    }
  };

  const goToBack = () => {
      const indexOfSong = filteredSongs.findIndex((s) => s._id === selectedSong?._id);
      const nextSong = indexOfSong === 0 ? filteredSongs[filteredSongs?.length - 1] : filteredSongs[indexOfSong - 1];
      setSelectedSong(nextSong)
  };

  return (
    <div className="row home-page">
      <SidebarHome />
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="row">
          <HomeHeader onChangeText={onChangeText} isFocus={isFocus}/>      
          <AuthModal />
          <MediaList songs={filteredSongs} song={selectedSong} onSelectSong={onSelectSong} filterText={filterText} />
          {selectedSong?._id && <MediaPlayer song={selectedSong} goToNext={goToNext} goToBack={goToBack} focus={focus} />}  
        </div>
      </div>
    </div>
  );
};

export default Home;
