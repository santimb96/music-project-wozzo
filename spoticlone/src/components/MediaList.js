import React, { useContext, useEffect } from "react";
import MediaContext from "../contexts/MediaContext";
import { getSongs } from "../services/songs";

const MediaList = () => {
  const mediaContext = useContext(MediaContext);

  useEffect(() => {
    getSongs()
      .then((song) => {
        mediaContext.setSong(song);
      })
      .catch((err) => console.warn(err));
  }, []);

  const onClicked = (song) => {
    console.log(song);
  }

  return (
    <div className="col-12 col-md-10 p-0 bg-dark">
      <div className="row">
        {mediaContext.song?.songs?.map((song, idx) => (
          <div key={song.name} onClick={() => onClicked(song)} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mt-4">
            <div
              className="card text-light bg-transparent"
              style={{ width: "18rem" }}
            >
              <img
                src="https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg"
                className="card-img-top"
                alt={song.name}
                style={{ maxWidth: "18rem" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{song.name}</h5>
                {/* <p class="card-text">{song.description}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default MediaList;
