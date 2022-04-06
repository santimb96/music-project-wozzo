import React, {useContext} from "react";
import MediaContext from "../contexts/MediaContext";

const MediaList = () => {

  const mediaContext = useContext(MediaContext);

  const renderMedia = mediaContext.song?.map(song => <div><h5>{song.name}</h5></div>);
  return (
    <div className="container-fluid bg-dark text-light">
      {renderMedia}
    </div>
  )
}

export default MediaList;