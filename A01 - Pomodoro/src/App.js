import React, { useRef, useState } from 'react';
import './App.css';

//Formátování času tak, aby při nižších čísel byla doplněna nula
function formatTime(time) {
  return time > 9 ? `${time}` : `0${time}`; // Moje řešení
  // return time.toString().padStart(2, '0'); // Chrisovo řešení
}

const pomodoroTime = 25;

export default function App() {
  const [title, setTitle] = useState('Let coundown begin!');
  const [timeLeft, setTimeLeft] = useState(pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRan, setHasRan] = useState(false);
  const intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current != null) return;
    setTitle(`You're doing great!`);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          setIsRunning(true);
          setHasRan(true);
          return timeLeft - 1;
        }

        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current); //nutné pro vyčištění intervalu
    intervalRef.current = null; //nutné pro úplné vynulování intervalu
    setIsRunning(false);
    setTitle('Keep It Up!');
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setHasRan(false);
    setTimeLeft(pomodoroTime * 60);
  }

  const minutes = formatTime(Math.floor(timeLeft / 60));
  const seconds = formatTime(timeLeft % 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {hasRan && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
