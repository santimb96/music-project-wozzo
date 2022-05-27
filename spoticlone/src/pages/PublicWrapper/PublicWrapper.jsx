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
import listCardTypes from "../../utils/listCardTypes";
import "./index.scss";
import Footer from "../../components/Footer/Footer";

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
  const getData = () =>  new Promise((resolve, reject) => {
    setLoading(true);
    Promise.all([
      getSongs(),
      getArtists(),
      user?._id && getUserFavSongs(user?._id),
      getGenres(),
    ])
      .then(
        ([
          songsResponse,
          artistsResponse,
          favSongsResponse,
          genresResponse,
        ]) => {
          resolve({genres: genresResponse?.genres, songs: songsResponse?.songs, artists: artistsResponse?.artists, favSongs: favSongsResponse?.favouriteSongs});
        }
      )
      .catch(() => {
        songList?.length !== 0 && setShowError(true);
        reject(new Error("Error al obtener los datos"));
      })
      .finally(() => setLoading(false));
  });

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
      .catch(() => setShowError(true));
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
    //we detect the popstate event and when the user clicks to browser back button, set param is null and useEffect will be called again 
    window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
    window.addEventListener('popstate', () => {
      setParam(null);
     }, false);

    if(songList?.length === 0){
      getData().then(dataResponse => {
        const { genres, songs, artists, favSongs } = dataResponse;
        setGenresList(genres);
            const data = songs?.map((song) => {
              const artist = artists?.find(
                (artist) => artist._id === song?.artistId
              );
  
              const genre = genres?.find(
                (genre) => genre._id === song.genreId
              );
  
              return {
                ...song,
                artistName: artist?.name,
                genreName: genre?.name,
              };
            });
            setSongList(data);
            setFilteredSongList(data);
            setFavouriteList(favSongs);
            const formatted = favSongs?.map((fav) => {
              return data?.find((song) => song?._id === fav?.songId);
            });
            setSongsFavList(formatted);
            urlControl(data);
      });
    } else {
      urlControl(songList);
    }
  }, [param]);


  const urlControl = (songs) => {
    const uri = new URLSearchParams(window.location.search);
    const paramUrl = uri.get('type') || uri.get('genre');
    const option = param !== "" ? param : paramUrl;

    if (option === "medialist") {
      window.history.pushState({}, null, "/list?type=" + option); 
      controlToDisplay(option, songs);
    } else if (option === "favourites") {
      if (user?._id && userRole === "user") {
        window.history.pushState({}, null, "/list?type=" + option);
        controlToDisplay(option);
      } else {
        setParam("");
        setAuthModalType(MODAL_STATES.LOGIN);
        setShowAuthModal(true);
      }
    } else if (option === "" || option === null) {
      window.history.pushState({}, null, window.location.pathname);
      controlToDisplay(option, songs);
    } else {
      window.history.pushState({}, null, "/list?genre=" + option);
      controlToDisplay(option, songs);
    }
  }

  const controlToDisplay = (option, songs) => {
    if (option === "favourites") {
      toDisplay(false, false, true);
    } else if (option === "medialist") {
      setFilteredSongList(songs);
      toDisplay(false, true, false);
    } else if (option?.length > 0) {
      const filtered = songs?.filter(
        (song) => song?.genreName?.toLowerCase() === option?.toLowerCase()
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
                  <HomeCard key={genre?.name} item={genre} setParam={setParam} />
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
              {listCardTypes?.length > 0 &&
                listCardTypes?.map((card) => (
                  <ListCard
                    key={card?.title}
                    img={card?.img}
                    listType={card?.listType}
                    title={card?.title}
                    setParam={setParam}
                  />
                ))}
            </div>
          </>
        )}
        {showList && (
          <>
            <button
              className="btn alternate-public-pages"
              onClick={() => {
                window.history.pushState({}, null, "/list");
                setParam(null);
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
                window.history.pushState({}, null, "/list");
                setParam(null);
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
      {selectedSong?._id ? (
        <MediaPlayer
          focus={focus}
          selectedSong={selectedSong}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
          isFavourite={favouriteList?.find(fav => fav?.songId === selectedSong?._id)}
          onClickFavourite={onClickFavourite}
        />
      ) : (
        <Footer />
      )}
      <SnackBarInfo open={showInfo} handleInfoClose={handleInfoClose} />
      <SnackBarError open={showError} handleErrorClose={handleErrorClose} />
    </>
  );
};

export default PublicWrapper;
