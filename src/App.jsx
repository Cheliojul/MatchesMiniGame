import React, { useState, useCallback } from 'react';
import './reset.scss';
import './App.scss';
import { Game } from './components/Game/Game';
import { StartScreen } from './components/StartScreen/StartScreen';

export const App = () => {
  const [started, setStarted] = useState(false);
  const [firstTurn, setFirstTurn] = useState(0);
  const [maxMatches, setMaxMatches] = useState(14);
  const [activeMatches, setActiveMatches] = useState(3);
  const startGame = useCallback(
    (whosfirstTurn, maxMatchesCount, activeMatchesCount) => {
      setStarted(true);
      setFirstTurn(whosfirstTurn);
      if (maxMatchesCount !== maxMatches) {
        setMaxMatches(+maxMatchesCount);
      }
      if (activeMatchesCount !== activeMatches) {
        setActiveMatches(+activeMatchesCount);
      }
    },
    [maxMatches, activeMatches],
  );

  return (
    <>
      <div className="game-window">
        <div className="game-window__container">
          {!started
            ? <StartScreen startGame={startGame} />
            : ''}
          {started
          && (
            <Game
              firstTurn={firstTurn}
              maxMatches={maxMatches}
              activeMatches={activeMatches}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
