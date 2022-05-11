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
import MediaContext from "../../contexts/MediaContext";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, setShowAuthModal, setAuthModalType } = authContext;

  const {
    selectedSong,
    setSelectedSong,
    songList,
    setSongList,
    filteredSongList,
    setFilteredSongList,
    favouriteList,
    setFavouriteList,
    goToNext,
    setGoToNext,
    goToPrevious,
    setGoToPrevious,
  } = useContext(MediaContext);
  const token = localStorage.getItem("token");

  const [filterText, setFilterText] = useState("");

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
        setSongList(data);
        setFilteredSongList(data);
        setFavouriteList(favouriteSongsResponse?.favouriteSongs);
      })
      .catch((err) => console.error(err));
  };

  const getFavourites = () => {
    getUserFavSongs(user?._id)
      .then((favs) => {
        setFavouriteList(favs?.favouriteSongs);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, [user]);

  const onSelectSong = (index) => {
    setSelectedSong(filteredSongList[index]);
  };

  const onChangeText = (text) => {
    const filtered = songList?.filter((song) => {
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
    setFilteredSongList(filtered);
    setFilterText(text);
  };

  useEffect(() => {
    if (goToNext) {
      const indexOfSong = filteredSongList?.findIndex(
        (s) => s._id === selectedSong?._id
      );
      const nextSong =
        indexOfSong === filteredSongList?.length - 1
          ? filteredSongList?.[0]
          : filteredSongList?.[indexOfSong + 1];
      setSelectedSong(nextSong);
      setGoToNext(false);
    }

    if (goToPrevious) {
      const indexOfSong = filteredSongList?.findIndex(
        (s) => s._id === selectedSong?._id
      );
      const previousSong =
        indexOfSong === 0
          ? filteredSongList?.[filteredSongList?.length - 1]
          : filteredSongList?.[indexOfSong - 1];
      setSelectedSong(previousSong);
      setGoToPrevious(false);
    }
  }, [goToNext, goToPrevious]);

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
        const match = favouriteList.find(
          (f) => f.songId === songId && f.userId === user?._id
        );
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
      <Search onChangeText={onChangeText} />
      {filteredSongList?.length === 0 && filterText !== "" ? (
        <NoResultsFound msg={<h2 className="text-light">No hay resultados</h2>} />
      ) : (
        <MediaList
          onSelectSong={onSelectSong}
          filterText={filterText}
          onClickFavourite={onClickFavourite}
        />
      )}
    </div>
  );
};

export default Home;
