import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './start.scss';

export const StartScreen = ({ startGame, setGameMode }) => {
  const [maxMatches, setMaxMatches] = useState(12);
  const [activeMatches, setActiveMatches] = useState(3);

  const changeMaxMatches = (changeEvent) => (
    setMaxMatches(changeEvent.target.value)
  )
  const changeActiveMatches = (changeEvent) => (
    setActiveMatches(changeEvent.target.value)
  )

  return (
  <div  className="start"> 
    <div className="start__title">Standart Game Mode</div>
    <div className="start__container">
    <button
        type="button"
        className="start__button"
        onClick={() => {
          startGame(1)
        }}
      >
        Player First Turn
      </button>
      <button
        type="button"
        className="start__button"
        onClick={() => {
          startGame(2)
        }}
      >
        Computer First Turn
      </button>
    </div>
    
    <div className="start__custom">
    <div className="start__title">Custom Game Mode</div>
      <input
        type='number'
        className="start__input max-matches"
        placeholder="Enter Amount of matches"
        value={maxMatches}
        onChange={changeMaxMatches}
        min='2'
      >
      </input>
      <input
        type='number'
        className="start__input active-matches"
        placeholder="Enter Amount of active matches"
        value={activeMatches}
        onChange={changeActiveMatches}
        min='1'
      >
      </input>
      <button
        type="button"
        className="start__button"
        onClick={() => {
          startGame(1, maxMatches, activeMatches)
        }}
      >
        Player First Turn
      </button>
      <button
        type="button"
        className="start__button"
        onClick={() => {
          startGame(2, maxMatches, activeMatches)
        }}
      >
        Computer First Turn
      </button>
    </div>
  </div>
  );
}

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired,
};
