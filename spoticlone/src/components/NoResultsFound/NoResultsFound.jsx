import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const NoResultsFound = ({msg}) => {
  return (
    <div className="msg-container">
      <h2>
        {msg}
      </h2>
    </div>
  );
}

NoResultsFound.propTypes = {
  msg: PropTypes.string.isRequired
}

export default NoResultsFound