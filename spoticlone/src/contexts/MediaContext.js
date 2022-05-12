import React, { useState } from "react";

const MediaContext = React.createContext();

export const MediaProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songList, setSongList] = useState([]);
  const [filteredSongList, setFilteredSongList] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const [songsFavList, setSongsFavList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focus, setFocus] = useState(false);
  const [goToNext, setGoToNext] = useState(false);
  const [goToPrevious, setGoToPrevious] = useState(false);


  // SONG CONTEXT

  const [track, setTrack] = useState(null);
  const [volume, setVolume] = useState(null);


  return (
    <MediaContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        songList,
        setSongList,
        filteredSongList,
        setFilteredSongList,
        favouriteList,
        setFavouriteList,
        isPlaying,
        setIsPlaying,
        focus,
        setFocus,
        goToNext,
        setGoToNext,
        goToPrevious,
        setGoToPrevious,
        songsFavList,
        setSongsFavList,
        track,
        setTrack,
        volume,
        setVolume
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
