import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const NoResultsFound = ({msg}) => {
  return (
    <div className="d-flex justify-content-center msg-container">
      <div>
        {msg}
      </div>
    </div>
  );
}

NoResultsFound.propTypes = {
  msg: PropTypes.string.isRequired
}

export default NoResultsFound