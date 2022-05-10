import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Search = ({ onChangeText, isFocus }) => {

  const onFocus = () => {
    isFocus(true);
  };

  const onBlur = () => {
    isFocus(false);
  };
  return (
    <div className="input-search-home-container">
    <input
      type="search"
      className="input-search-home"
      onChange={(e) => onChangeText(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder="Artistas o canciones"
    />
  </div>
  )
}

Search.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  isFocus: PropTypes.func.isRequired
}

export default Search