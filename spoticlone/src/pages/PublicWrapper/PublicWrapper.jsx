import React, { useContext, useEffect, useState } from "react";
import MediaList from "../../components/MediaList/MediaList";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import FavouriteList from "../../components/FavouriteList/FavouriteList";
import AuthContext from "../../contexts/AuthContext";
import { MODAL_STATES } from "../../contexts/AuthContext";
import { getSongs } from "../../services/songs";
import { getArtists } from "../../services/artists";
import { getGenres } from "../../services/genres";
import { getUserFavSongs } from "../../services/favouriteSongs";
import { deleteFavSong, postFavSong } from "../../services/favouriteSongs";
import Search from "../../components/Search/Search";
import SnackBarInfo from "../../components/SnackBarInfo/SnackBarInfo";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import SpinnerInLine from "../../components/SpinnerInLine/SpinnerInLine";
import HomeCard from "../../components/HomeCard/HomeCard";
import ListCard from "../../components/ListCard/ListCard";
import "./index.scss";

const PublicWrapper = () => {
  const { user, userRole } = useContext(AuthContext);
  const [param, setParam] = useState("");
  const [songList, setSongList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);
  const [songsFavList, setSongsFavList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [filteredSongList, setFilteredSongList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listType, setListType] = useState("");

  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);

  const [showListsOptions, setShowListsOptions] = useState(true);

  const [showList, setShowList] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);

  const { setAuthModalType, setShowAuthModal } = useContext(AuthContext);

  const handleInfoClose = () => setShowInfo(false);
  const handleErrorClose = () => setShowError(false);

  const toDisplay = (listsOptions, lists, favourites) => {
    setShowListsOptions(listsOptions);
    setShowList(lists);
    setShowFavourites(favourites);
  };

  //we get songs, artists and fav songs and then sets each result in contexts state
  const getData = () => {
    setLoading(true);
    Promise.all([
      getSongs(),
      getArtists(),
      getUserFavSongs(user?._id),
      getGenres(),
    ])
      .then(
        ([
          songsResponse,
          artistsResponse,
          favSongsResponse,
          genresResponse,
        ]) => {
          setGenresList(genresResponse?.genres);
          const data = songsResponse.songs.map((song) => {
            const artist = artistsResponse.artists.find(
              (artist) => artist._id === song.artistId
            );

            const genre = genresResponse.genres.find(
              (genre) => genre._id === song.genreId
            );

            return {
              ...song,
              artistName: artist.name,
              genreName: genre.name,
            };
          });
          setSongList(data);
          setFilteredSongList(data);
          setFavouriteList(favSongsResponse?.favouriteSongs);
          const formatted = favSongsResponse?.favouriteSongs.map((fav) => {
            return data?.find((song) => song?._id === fav?.songId);
          });
          setSongsFavList(formatted);
        }
      )
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
    deleteFavSong(song)
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
    postFavSong(favSong)
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

  useEffect(() => {
    
    if (param === "medialist") {
      window.history.pushState(
        {},
        null,
        window.location.pathname + "?type=" + param
      );
      controlToDisplay();
    } else if (param === "favourites") {
      if (user?._id && userRole === "user") {
        window.history.pushState(
          {},
          null,
          window.location.pathname + "?type=" + param
        );
        controlToDisplay();
      } else {
        setParam("");
        setAuthModalType(MODAL_STATES.LOGIN);
        setShowAuthModal(true);
      }
    } else if (param === "") {
      window.history.pushState({}, null, window.location.pathname);
      controlToDisplay();
    } else {
      window.history.pushState(
        {},
        null,
        window.location.pathname + "?genre=" + param
      );
      controlToDisplay();
    }
  }, [param]);

  const controlToDisplay = () => {
    if (param === "favourites") {
      toDisplay(false, false, true);
    } else if (param === "medialist") {
      setFilteredSongList(songList);
      toDisplay(false, true, false);
    } else if (param) {
      const filtered = songList?.filter(
        (song) => song?.genreName?.toLowerCase() === param.toLowerCase()
      );
      setFilteredSongList(filtered);
      toDisplay(false, true, false);
    } else {
      toDisplay(true, false, false);
    }
  };

  return (
    <>
      <div className="public-wrapper">
        {showListsOptions && (
          <>
            <div className="genre-title">
              <h2>Por género</h2>
            </div>
            <div className="grid-container">
              {!loading ? (
                genresList?.map((genre) => (
                  <HomeCard key={genre?._id} item={genre} setParam={setParam} />
                ))
              ) : (
                <div className="spinner-in-line-cards">
                  <SpinnerInLine />
                </div>
              )}
            </div>

            <div className="list-title">
              <h2>Listas</h2>
            </div>
            
            <div className="grid-container-lists">
              <ListCard
                img={
                  "https://mixed-media-images.spotifycdn.com/daily-drive/daily-drive-2.0-es-mx-default.jpg"
                }
                listType={"medialist"}
                title={"Ruta diaria"}
                setParam={setParam}
              />
              <ListCard
                img={"https://misc.scdn.co/liked-songs/liked-songs-640.png"}
                listType={"favourites"}
                title={"Favoritos"}
                setParam={setParam}
              />
              
            </div>
          </>
        )}
        {showList && (
          <>
            <button
              className="btn alternate-public-pages"
              onClick={() => {
                setParam("");
              }}
            >
              <i className="fa-solid fa-house"></i>
            </button>
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
        {showFavourites && (
          <>
            <button
              className="btn alternate-public-pages"
              onClick={() => {
                setParam("");
              }}
            >
              <i className="fa-solid fa-house"></i>
            </button>
            <FavouriteList
              onSelectSong={onSelectSong}
              songsFavList={songsFavList}
              selectedSong={selectedSong}
              loading={loading}
              onClickFavourite={onClickFavourite}
            />
          </>
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
