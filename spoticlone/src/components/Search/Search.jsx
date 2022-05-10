import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import MediaContext from '../../contexts/MediaContext';

const Search = ({ onChangeText }) => {

  const {setFocus} = useContext(MediaContext);

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
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

}

export default Search