import React from 'react'
import PropTypes from 'prop-types'
import FavouriteList from '../../components/FavouriteList/FavouriteList'
import './index.scss';
const Favourites = () => {
  return (
    <div className='favourites-page'>
      <FavouriteList />
    </div>
  )
}

Favourites.propTypes = {}

export default Favourites;