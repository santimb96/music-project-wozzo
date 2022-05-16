import React, { useContext, useEffect, useState } from "react";
import MediaList from "../../components/MediaList/MediaList";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import FavouriteList from "../../components/FavouriteList/FavouriteList";
import AuthContext from "../../contexts/AuthContext";
import { MODAL_STATES } from "../../contexts/AuthContext";
import { getSongs } from "../../services/songs";
import { getArtists } from "../../services/artists";
import { getUserFavSongs } from "../../services/favouriteSongs";
import { deleteFavSong, postFavSong } from "../../services/favouriteSongs";
import Search from "../../components/Search/Search";
import SnackBarInfo from "../../components/SnackBarInfo/SnackBarInfo";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import "./index.scss";

const TABS = {
  FAVOURITES: "favorites",
  SONGS: "songs",
};

const PublicWrapper = () => {

  const { user, userRole } = useContext(AuthContext);
  const [songList, setSongList] = useState([]);
  const [tab, setTab] = useState(TABS.SONGS);
  const [selectedSong, setSelectedSong] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);
  const [songsFavList, setSongsFavList] = useState([]);
  const [filteredSongList, setFilteredSongList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listType, setListType] = useState("");

  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);

  const { setAuthModalType, setShowAuthModal } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const handleInfoClose = () => setShowInfo(false);
  const handleErrorClose = () => setShowError(false);

  useEffect(()=> {
    if(!user?._id) setTab(TABS.SONGS);
  }, [user]);

  //we get songs, artists and fav songs and then sets each result in contexts state
  const getData = () => {
    setLoading(true);
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
        setFilteredSongList(data);
        setFavouriteList(favSongsResponse?.favouriteSongs);
        const formatted = favSongsResponse?.favouriteSongs.map((fav) => {
          return data?.find((song) => song?._id === fav?.songId);
        });
        setSongsFavList(formatted);
      })
      .catch(() => songList?.length !== 0 && setShowError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (songList?.length === 0 || user?._id) getData();
  }, [user]);

  const getFavourites = () => {
    getUserFavSongs(user?._id)
      .then((favs) => {
        setFavouriteList(favs?.favouriteSongs);
        const formatted = favs?.favouriteSongs.map((fav) => {
          return songList?.find((song) => song?._id === fav?.songId);
        });
        setSongsFavList(formatted);
      })
      .catch(() => setShowError(true) /*TODO custom error*/);
  };

  const onSelectSong = (i, type) => {
    if (type === "mediaList") {
      setSelectedSong(filteredSongList[i]);
      setListType("mediaList");
    } else {
      setSelectedSong(songsFavList?.find((s) => s?._id === i));
      setListType("favouriteList");
    }
  };
  //when we search, we filter the list
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
  };

  const goToNext = () => {
    const listToValorate =
      listType === "mediaList" ? filteredSongList : songsFavList;
    const indexOfSong = listToValorate?.findIndex(
      (s) => s._id === selectedSong?._id
    );
    const nextSong =
      indexOfSong === listToValorate?.length - 1
        ? listToValorate?.[0]
        : listToValorate?.[indexOfSong + 1];
    setSelectedSong(nextSong);
  };

  const goToPrevious = () => {
    const listToValorate =
      listType === "mediaList" ? filteredSongList : songsFavList;

    const indexOfSong = listToValorate?.findIndex(
      (s) => s._id === selectedSong?._id
    );
    const previousSong =
      indexOfSong === 0
        ? listToValorate?.[listToValorate?.length - 1]
        : listToValorate?.[indexOfSong - 1];
    setSelectedSong(previousSong);
  };

  const deleteFav = (song) => {
    deleteFavSong(song, token)
      .then(() => {
        setShowInfo(true);
        getFavourites();
      })
      .catch(() => setShowError(true));
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
    <>
      <div className="public-wrapper">
        {user?._id && (
          <button
            className="btn alternate-public-pages"
            onClick={() =>
              tab === TABS.SONGS ? setTab(TABS.FAVOURITES) : setTab(TABS.SONGS)
            }
          >
            {tab === TABS.SONGS ? (
              <i className="fa-regular fa-heart"></i>
            ) : (
              <i className="fa-solid fa-house"></i>
            )}
          </button>
        )}

        {tab === TABS.SONGS && (
          <>
            <Search onChangeText={onChangeText} setFocus={setFocus} />
            <MediaList
              onSelectSong={onSelectSong}
              onClickFavourite={onClickFavourite}
              filteredSongList={filteredSongList}
              favouriteList={favouriteList}
              selectedSong={selectedSong}
            />
          </>
        )}
        {tab === TABS.FAVOURITES && user?._id && userRole === "user" && (
          <FavouriteList
            onSelectSong={onSelectSong}
            songsFavList={songsFavList}
            selectedSong={selectedSong}
            loading={loading}
            onClickFavourite={onClickFavourite}
          />
        )}
      </div>
      {selectedSong?._id && (
        <MediaPlayer
          focus={focus}
          selectedSong={selectedSong}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
        />
      )}
      <SnackBarInfo open={showInfo} handleInfoClose={handleInfoClose} />
      <SnackBarError open={showError} handleErrorClose={handleErrorClose} />
    </>
  );
};

export default PublicWrapper;
