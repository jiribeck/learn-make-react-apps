import React, { useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

import WinsLosses from './components/WinsLosses';

const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
];

const gameStates = [
  { id: 1, name: 'win', text: 'you won!' },
  { id: 2, name: 'lose', text: 'you lost!' },
  { id: 3, name: 'draw', text: `it's a draw!!` },
];

export default function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoise] = useState(null);
  const [gameState, setGameState] = useState(null); //win, lose, draw

  function handleUserChoice(choice) {
    const chosenChoice = choices.find((c) => c.id === choice);
    setUserChoice(chosenChoice);

    if (chosenChoice === computerChoice) {
      setGameState(gameStates.find((s) => s.id === 3));
    } else if (chosenChoice.losesTo !== computerChoice.id) {
      setWins((wins) => wins + 1);
      setGameState(gameStates.find((s) => s.id === 1));
    } else {
      setLosses((losses) => losses + 1);
      setGameState(gameStates.find((s) => s.id === 2));
    }
  }

  function createComputerChoise() {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoise(randomChoice);
  }

  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }

  const restartGame = () => {
    setUserChoice(null);
    setGameState(null);
    createComputerChoise();
  };

  function resetGame() {
    setLosses(0);
    setWins(0);
    restartGame();
  }

  useEffect(() => {
    restartGame();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        <WinsLosses wins={wins} losses={losses} resetGame={resetGame} />
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div className={`game-state ${gameState.name}`}>
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              <p>{gameState.text}</p>
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={restartGame}>Again</button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button
            className="rock"
            onClick={() => {
              handleUserChoice(1);
            }}
          >
            <Rock />
          </button>
          <button
            className="paper"
            onClick={() => {
              handleUserChoice(2);
            }}
          >
            <Paper />
          </button>
          <button
            className="scissors"
            onClick={() => {
              handleUserChoice(3);
            }}
          >
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
