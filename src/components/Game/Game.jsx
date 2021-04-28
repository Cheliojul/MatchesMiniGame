import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './game.css';
import { EndScreen } from '../EndScreen/EndScreen';


export const Game = ({ gamemode, maxMatches, activeMatches }) => {
  const [isPlayerTurn, setPlayerTurn] = useState(gamemode === 1 ? true : false);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const countRef = useRef();
  debugger;
  const matchesToWin = (maxMatches * 2) + 1 || 25;
  const count = useMemo(() => (matchesToWin - playerScore - computerScore),
  [playerScore, computerScore]);

  countRef.current = count;

  const computerTurn = useCallback(
    () => {
      setTimeout(() => {
        const remainedMatches = countRef.current;
        let selectedComputerNumber;
        if (remainedMatches > 3) {
          if ((remainedMatches - 1) % 4 === 0 || (remainedMatches- 1) % 4 === 1) {
            selectedComputerNumber = 1;
          } else if ((remainedMatches - 3) % 4 === 0 || (remainedMatches- 3) % 4 === 1) {
            selectedComputerNumber = 3;
          }
          selectedComputerNumber = (computerScore + 3) % 2 === 0 ? 1 : 2;
        }
        if (remainedMatches === 3) {
          selectedComputerNumber = (computerScore % 2 ) === 0 ? 2 : 3;
        }
        if (remainedMatches < 3) {
          selectedComputerNumber = (computerScore % 2 ) === 0 ? 2 : 1;
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
    const value  = Number(event.target.value);
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
    Array(activeMatches).fill().map((el, i) => (
      <button
        type="button" 
        className="player__button"
        value={i+1}
        onClick={playerTurn}
      >
        {i+1}
      </button>
  ))
  )
  const resetGame = useCallback(
    () => {
      setIsPlayerWon(false);
      setPlayerScore(0);
      setComputerScore(0);
      setPlayerTurn(true);
      if (gamemode === 2){
        computerTurn();
      }
    },
    [],
  );
  useEffect(() => {
   if (gamemode === 2){
     computerTurn();
   } 
  },[])
  
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
        {createButtons()}
      </div>
    </>
  );
}
