import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function HomeCard({ item, setParam }) {
  return (
    <div
      className="genre-card"
      
      onClick={() => setParam(item?.name.toLowerCase())}
    >
      <div className="background-img" style={{ backgroundImage: `url(${item?.genreImg})` }}>

      </div>
      <h2 className="card-title">{item?.name}</h2>
      <div className="card-content">
        <i class="fa-solid fa-circle-play"></i>
      </div>
    </div>
  );
}

HomeCard.propTypes = {
  item: PropTypes.object,
  setParam: PropTypes.func,
};

export default HomeCard;
