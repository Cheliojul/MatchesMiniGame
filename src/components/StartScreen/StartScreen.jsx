import React from 'react';
import PropTypes from 'prop-types';
import './start.css';

export const Start = () => (
  <button type="button" className="start_button">
    Start
  </button>
);

Start.propTypes = {
  startGame: PropTypes.func.isRequired,
};
