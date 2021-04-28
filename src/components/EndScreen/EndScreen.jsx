import React from 'react';
import PropTypes from 'prop-types';
import './end.css';

export const EndScreen = ({ isPlayerWon }) => (
  <div>
    { isPlayerWon ? 'Player won!' : ''}
    { !isPlayerWon ? 'Computer won!' : ''}
  </div>
);

EndScreen.propTypes = {
  isPlayerWon: PropTypes.func.isRequired,
};
