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
      .catch((err) => console.warn("No se ha podido hacer fecth"));
  }, []);
  console.log(mediaContext.song);

  const randomImg = (idx) => `https://unsplash.it/150/200?image=${idx}`;

  return (
    <div className="container-fluid bg-dark text-light">
      <div className="row">
        {mediaContext.song?.songs?.map((song, idx) => (
          <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mt-4">
            <div
              className="card text-light bg-transparent"
              style={{ width: "18rem" }}
            >
              <img
                src={randomImg(idx)}
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
