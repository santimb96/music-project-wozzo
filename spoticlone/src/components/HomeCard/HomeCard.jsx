import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function HomeCard({ item, setParam }) {
  return (
    <div
      className="card genre-card"
      key={item?.name}
      onClick={() => {
        setParam(item?.name.toLowerCase());
      }}
    >
      <div className="img-container">
        <img
          src={
            item?.genreImg ||
            "https://mixed-media-images.spotifycdn.com/daily-drive/daily-drive-2.0-es-mx-default.jpg"
          }
          className="card-img-top"
          alt={item?.name}
        />
        <div className="play-icon-genre-card">
          <i className="fa-solid fa-play"></i>
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-title text-center">{item?.name}</h2>
        {/* <small>Some quick example text to build on the card title and make up the bulk of the card's content.</small> */}
      </div>
    </div>
  );
}

HomeCard.propTypes = {
  item: PropTypes.object,
  setParam: PropTypes.func,
};

export default HomeCard;
