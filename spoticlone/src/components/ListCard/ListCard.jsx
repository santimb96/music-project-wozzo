import React from "react";
import PropTypes from "prop-types";
import './index.scss';

function ListCard({ img, listType, title, setParam }) {
  return (
    <div
      className="card flex-row list-cards"
      onClick={() => {
        setParam(listType);
      }}
    >
      <img src={img} className="card-img-left" alt={title} />
      <div className="card-body row">
        <h2 className="card-title col-6">{title}</h2>
        <div className="play-icon-list col-6">
          <i class="fa-solid fa-circle-play"></i>
        </div>
      </div>
    </div>
  );
}

ListCard.propTypes = {
  img: PropTypes.string,
  listType: PropTypes.string,
  title: PropTypes.string,
  setParam: PropTypes.func,
};

export default ListCard;
