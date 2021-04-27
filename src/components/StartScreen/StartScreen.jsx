import React from 'react';
import PropTypes from 'prop-types';
import './start.css';

export const StartScreen = ({ startGame }) => (
  <button
    type="button"
    className="start__button"
    onClick={() => { startGame() }}
  >
    Start
  </button>
);

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired,
};
