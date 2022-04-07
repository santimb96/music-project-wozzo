import React, { useState } from "react";

const MediaContext = React.createContext();

export const MediaProvider = ({children}) => {
  const [song, setSong] = useState([]);
  const [artist, setArtist] = useState([]);

  return (
    <MediaContext.Provider value={{ song, setSong, artist, setArtist }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
