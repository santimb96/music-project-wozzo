import React, { useState } from "react";

const MediaContext = React.createContext();

export const MediaProvider = ({children}) => {
  const [song, setSong] = useState([{name: "s1", id: 1}, {name: "s2", id: 2}]);

  return (
    <MediaContext.Provider value={{ song, setSong }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
