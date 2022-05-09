import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ onChangeText, isFocus }) => {

  const onFocus = () => {
    isFocus(true);
  };

  const onBlur = () => {
    isFocus(false);
  };
  return (
    <div className="input-search-home-container d-flex justify-content-start">
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

Search.propTypes = {}

export default Search