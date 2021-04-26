import React, { useEffect, useMemo, useRef, useState } from 'react';
import './game.css';
import { EndScreen } from '../EndScreen';


export const Game = () => {
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [ComputerScore, setComputerScore] = useState(0);

  const countRef = useRef();

  const matchesToWin = 25;
  countRef.current = count;
  const count = useMemo(() => (matchesToWin - playerScore - ComputerScore),
  [playerScore, ComputerScore]);

  useEffect(() => {
    if (count === 0 && playerScore % 2 === 0) {
      setIsPlayerWon(true);
    }
  }, [count, playerScore]);

  const resetGame = useCallback(
    () => {
      setIsPlayerWon(false);
      setPlayerScore(0);
      setComputerScore(0);
      setPlayerTurn(true);
    },
    [],
  );

  return (
    <>
      <div className="computer__counter">
        {'Computer count: '}
      </div>
      <div className="counter">
        Matches left:
      </div>
      <div className="players__counter">
        {'Player count: '}
      </div>
      {count === 0 ? (<EndScreen isPlayerWon={isPlayerWon} />) : ''}
      <div className="button_container">
        <button
          className="player__button"
          value={1}
        >
          1
        </button>
        <button
          type="button"
          className="player__button"
          value={2}
        >
          2
        </button>
        <button
          type="button"
          className="player__button"
          value={3}
        >
          3
        </button>
      </div>
    </>
  );
}
