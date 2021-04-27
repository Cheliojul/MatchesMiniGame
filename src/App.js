import React, {useState, useCallback } from 'react'
import './App.css';
import { Game } from './components/Game/Game'
import { StartScreen } from './components/StartScreen/StartScreen'
import { EndScreen } from './components/EndScreen/EndScreen'
export const App = () => {
  const [started, setStarted] = useState(false);

  const startGame = useCallback(
    () => {
      setStarted(true);
    },
    [],
  );

  return (
    <>
      <div className="game-window">
        <div className="game-window__container">
          {!started
            ? <StartScreen startGame={startGame} />
            : ''}
          {started
            ? (<Game />)
            : ''}
        </div>
      </div>
    </>
  );
};

export default App;
