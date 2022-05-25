import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function HomeCard({ item, setParam }) {
  return (
    <div
      className="genre-card"
      onClick={() => setParam(item?.name.toLowerCase())}
    >
      <div
        className="background-img"
        style={{
          backgroundImage: `linear-gradient(155deg, rgba(255, 180, 30, 1), rgba(0, 0, 0, 0)), url("${item?.genreImg}")`,
        }}
      ></div>
      <h2 className="card-title">{item?.name}</h2>
      <div className="card-content">
        <i className="fa-solid fa-circle-play"></i>
      </div>
    </div>
  );
}

HomeCard.propTypes = {
  item: PropTypes.object,
  setParam: PropTypes.func,
};

export default HomeCard;
