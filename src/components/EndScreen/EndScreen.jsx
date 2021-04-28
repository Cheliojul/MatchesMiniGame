import React from 'react';
import PropTypes from 'prop-types';
import './end.scss';

export const EndScreen = ({ isPlayerWon }) => (
  <div className="end">
    <div className="end__title">
      { isPlayerWon ? '✨You won!✨' : ''}
      { !isPlayerWon ? '😭Computer won!😭' : ''}
    </div>
  </div>
);

EndScreen.propTypes = {
  isPlayerWon: PropTypes.bool.isRequired,
};
