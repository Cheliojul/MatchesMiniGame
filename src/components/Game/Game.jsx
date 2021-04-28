import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import './game.scss';
import { EndScreen } from '../EndScreen/EndScreen';

export const Game = ({ firstTurn, maxMatches, activeMatches }) => {
  const [isPlayerTurn, setPlayerTurn] = useState(firstTurn === 1);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const countRef = useRef();
  const matchesToWin = (maxMatches * 2) + 1 || 25;
  const count = useMemo(() => (matchesToWin - playerScore - computerScore),
    [playerScore, computerScore, matchesToWin]);

  countRef.current = count;

  const computerTurn = useCallback(
    () => {
      setTimeout(() => {
        const remainedMatches = countRef.current;
        let selectedComputerNumber;
        if (remainedMatches > 3) {
          if ((remainedMatches - 1) % 4 === 0 || (remainedMatches - 1) % 4 === 1) {
            selectedComputerNumber = 1;
          } else if ((remainedMatches - 3) % 4 === 0 || (remainedMatches - 3) % 4 === 1) {
            selectedComputerNumber = 3;
          }

          if (((computerScore + 3) % 2 !== 0) && ((remainedMatches - 3) === 3)) {
            selectedComputerNumber = 3;
          } else if (((computerScore + 2) % 2 !== 0) && ((remainedMatches - 2) === 3)) {
            selectedComputerNumber = 2;
          } else if (((computerScore + 1) % 2 !== 0) && ((remainedMatches - 1) === 3)) {
            selectedComputerNumber = 1;
          }
        }

        if (remainedMatches === 3) {
          selectedComputerNumber = (computerScore % 2) === 0 ? 2 : 3;
        }

        if (remainedMatches === 1 || remainedMatches === 2) {
          selectedComputerNumber = 1;
        }

        setComputerScore((prevState) => prevState + selectedComputerNumber);
        setPlayerTurn(true);
      }, 1000);
    },
    [computerScore],
  );

  const playerTurn = (event) => {
    const value = Number(event.target.value);
    if (!isPlayerTurn || count - value < 0) return;

    if (count - value !== 0) {
      setPlayerTurn(false);
      setPlayerScore(playerScore + value);
      computerTurn();
    } else {
      setPlayerScore(playerScore + value);
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    if (count === 0 && playerScore % 2 === 0) {
      setIsPlayerWon(true);
    }
  }, [count, playerScore]);

  const createButtons = () => (
    Array(activeMatches || 3).fill().map((el, i) => (
      <button
        type="button"
        className="game__button button"
        value={i + 1}
        onClick={playerTurn}
      >
        {i + 1}
      </button>
    ))
  );

  const resetGame = () => {
    setIsPlayerWon(false);
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerTurn(true);
    if (firstTurn === 2) {
      computerTurn();
    }
  };

  useEffect(() => {
    if (firstTurn === 2) {
      computerTurn();
    }
  }, [firstTurn, computerTurn]);

  return (
    <div className="game">
      {count === 0 ? (<EndScreen isPlayerWon={isPlayerWon} />)
        : (
          <>
            <div className="game__counters-container">
              <div className="game__counter">
                {'Computer score: '}
                {computerScore}
              </div>
              <div className="game__counter">
                Matches left:
                {count}
                <div className="game__emodji-container">
                  { count > 0
                    ? Array(count).fill().map(() => (
                      <span role="img">🔥</span>))
                    : ''}
                </div>
              </div>
              <div className="game__counter">
                {'Player score: '}
                {playerScore}
              </div>
            </div>

            <div className="game__title">
              {isPlayerTurn ? 'Your Turn now!' : 'Computer Turn now!'}
            </div>
            <div className="game__title">
              Choose amount of matches to take
            </div>
            <button
              type="button"
              className="game__reset button"
              onClick={resetGame}
            >
              Restart Game
            </button>
            <div className="game__buttons-container">
              {createButtons()}
            </div>
          </>
        )}
    </div>
  );
};
