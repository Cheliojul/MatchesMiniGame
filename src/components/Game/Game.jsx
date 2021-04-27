import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './game.css';
import { EndScreen } from '../EndScreen/EndScreen';


export const Game = () => {
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const countRef = useRef();

  const matchesToWin = 25;
  const count = useMemo(() => (matchesToWin - playerScore - computerScore),
  [playerScore, computerScore]);

  countRef.current = count;
  const computerTurn = useCallback(
    () => {
      setTimeout(() => {
        const remainedMatches = countRef.current;
        let selectedComputerNumber;

        if (remainedMatches > 3) {
          selectedComputerNumber = (computerScore + 3) % 2 === 0 ? 1 : 2;
        }
        if (countRef.current === 3) {
          selectedComputerNumber = (computerScore + 3) % 2 === 0 ? 3 : 2;
        }
        if (remainedMatches < 3) {
          selectedComputerNumber = (computerScore + 2) % 2 === 0 ? 2 : 1;
        }
        
        if (remainedMatches - 3 === 3 && (computerScore + 3) % 2 !== 0) {
          selectedComputerNumber = 3;
        } else if (remainedMatches - 2 === 3 && (computerScore + 2) % 2 !== 0) {
          selectedComputerNumber = 2;
        } else if (remainedMatches - 1 === 3 && (computerScore + 1) % 2 !== 0) {
          selectedComputerNumber = 1;
        }

        setComputerScore((prevState) => prevState + selectedComputerNumber);
        setPlayerTurn(true);
      }, 1000);
    },
    [],
  );

  const playerTurn = (event) => {
    const { value } = event.target;
    if (!isPlayerTurn || count - +value < 0) return;

    if (count - +value !== 0) {
      setPlayerTurn(false);
      setPlayerScore(playerScore + +value);
      computerTurn();
    } else {
      setPlayerScore(playerScore + +value);
      setPlayerTurn(false);
    }
  };

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
        {'Computer score: '}
        {computerScore}
      </div>
      <div className="counter">
        Matches left:
        {count}
      </div>
      <div className="players__counter">
        {'Player score: '}
        {playerScore}
      </div>
      <button
        type="button"
        className="reset__button"
        onClick={resetGame}
      >
        Restart Game
      </button>
      {count === 0 ? (<EndScreen isPlayerWon={isPlayerWon} />) : ''}
      <div className="button_container">
        <button
          className="player__button"
          value={1}
          onClick={playerTurn}
        >
          1
        </button>
        <button
          type="button"
          className="player__button"
          value={2}
          onClick={playerTurn}
        >
          2
        </button>
        <button
          type="button"
          className="player__button"
          value={3}
          onClick={playerTurn}
        >
          3
        </button>
      </div>
    </>
  );
}
