import React, { useEffect, useState, useContext } from "react";
import AuthContext, { MODAL_STATES } from "../../contexts/AuthContext";
import MediaList from "../../components/MediaList/MediaList";
import { getSongs } from "../../services/songs";
import { getArtists } from "../../services/artists";
import {
  deleteFavSong,
  getUserFavSongs,
  postFavSong,
} from "../../services/favouriteSongs";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import "./index.scss";
import AuthModal from "../../components/AuthModal/AuthModal";
import Search from "../../components/Search/Search";

const Home = () => {
  const authContext = useContext(AuthContext);
  const {
    user,
    setShowAuthModal,
    setAuthModalType,
  } = authContext;
  const token = localStorage.getItem("token");

  const [filterText, setFilterText] = useState("");

  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [focus, setFocus] = useState(false);

  const getData = () => {
    Promise.all([getSongs(), getArtists(), getUserFavSongs(user?._id)])
    .then(([songsResponse, artistsResponse, favouriteSongsResponse]) => {
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
        setFilteredSongs(data);
        setFavouriteSongs(favouriteSongsResponse?.favouriteSongs);
      })
      .catch((err) => console.error(err));
  };

  const getFavourites = () => {
    getUserFavSongs(user?._id)
      .then((favs) => {
        setFavouriteSongs(favs?.favouriteSongs)
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData();
  }, [user]);

  const onSelectSong = (index) => {
    setSelectedSong(filteredSongs[index]);
  };

  const onChangeText = (text) => {
    const filtered = songs?.filter((song) => {
      if (
        text[0] !== " " &&
        (song.name
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim()) ||
          song.artistName
            .toLocaleLowerCase()
            .includes(text.toLocaleLowerCase().trim()))
      ) {
        return true;
      }
      return false;
    });
    setFilteredSongs(filtered);
    setFilterText(text);
  };

  const isFocus = (value) => {
    setFocus(value);
  };

  const goToNext = (loop) => {
    if (loop === false) {
      const indexOfSong = filteredSongs.findIndex(
        (s) => s._id === selectedSong?._id
      );
      const nextSong =
        indexOfSong === filteredSongs.length - 1
          ? filteredSongs[0]
          : filteredSongs[indexOfSong + 1];
      setSelectedSong(nextSong);
    }
  };

  const goToBack = () => {
    const indexOfSong = filteredSongs.findIndex(
      (s) => s._id === selectedSong?._id
    );
    const nextSong =
      indexOfSong === 0
        ? filteredSongs[filteredSongs?.length - 1]
        : filteredSongs[indexOfSong - 1];
    setSelectedSong(nextSong);
  };

  const deleteFav = (song) => {
    deleteFavSong(song, token)
      .then(() => {
        getFavourites();
      })
      .catch((err) => console.error(err));
  };

  const addFav = (songId) => {
    const favSong = {
      userId: user?._id,
      songId: songId,
    };
    postFavSong(favSong, token)
      .then(() => {
        getFavourites();
      })
      .catch((err) => console.error(err));
  };

  const onClickFavourite = (songId, onDelete) => {
    if (user?._id) {
      if (onDelete) {
        const match = favouriteSongs.find((f) => f.songId === songId && f.userId === user?._id);
        deleteFav(match._id);
      } else {
        addFav(songId);
      }
    } else {
      setAuthModalType(MODAL_STATES.LOGIN);
      setShowAuthModal(true);
    }
  };

  return (
    <div className="home-page">
      <Search isFocus={isFocus} onChangeText={onChangeText}/>
      <MediaList
        songs={filteredSongs}
        favouriteSongs={favouriteSongs}
        song={selectedSong}
        onSelectSong={onSelectSong}
        filterText={filterText}
        onClickFavourite={onClickFavourite}
      />
    </div>
  );
};

export default Home;
