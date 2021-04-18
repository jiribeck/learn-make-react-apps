import React, { useCallback, useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useSpeechSynthesis } from 'react-speech-kit';

import './App.css';

export default function App() {
  const [timers, setTimers] = useState([
    { time: 13, text: 'this is my message' },
    { time: 5, text: 'hello' },
    { time: 10, text: 'whats up' },
    { time: 12, text: 'this is my last message' },
    { time: 8, text: 'add text' },
  ]);

  const { seconds, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const { speak, speaking, supported } = useSpeechSynthesis();

  const getLastTimerIndex = useCallback(() => {
    let timeArray = [];
    timers.map((timer) => {
      return timeArray.push(timer.time);
    });
    let i = timeArray.indexOf(Math.max(...timeArray));
    return i;
  }, [timers]);

  useEffect(() => {
    const lastTimer = getLastTimerIndex();
    const foundTimer = timers.find((t) => t.time === seconds);

    if (foundTimer && !speaking) {
      speak({ text: foundTimer.text });
    }

    if (seconds > timers[lastTimer].time) {
      reset();
      pause();
    }
  }, [seconds, reset, timers, pause, speak, speaking, getLastTimerIndex]);

  function updateTimers(index, time, text) {
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;
    setTimers(newTimers);
  }

  function addTimer() {
    const newTimers = [...timers, { time: 1, text: 'add text' }];
    setTimers(newTimers);
  }

  if (!supported) {
    return <div>Your browser is not supported!</div>;
  }

  return (
    <div className="app">
      <h2>Talk the Talk</h2>

      <div className="timers">
        {/* timers go here */}
        {timers.map((timer, index) => (
          <TimerSlot
            key={index}
            index={index}
            timer={timer}
            updateTimers={updateTimers}
          />
        ))}

        <button onClick={addTimer} className="add-button">
          Add
        </button>
      </div>

      {/* seconds */}
      <h2>{seconds}</h2>

      {/* buttons */}
      <div className="buttons">
        {!isRunning && (
          <button onClick={start} className="start-button">
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={() => {
              reset();
              pause();
            }}
            className="stop-button"
          >
            Stop
          </button>
        )}
      </div>
      {speaking && <div>Speaking...</div>}
    </div>
  );
}

function TimerSlot({ timer, index, updateTimers }) {
  const [time, setTime] = useState(timer.time);
  const [text, setText] = useState(timer.text);

  function handleBlur() {
    updateTimers(index, time, text);
  }

  return (
    <form key={index} className="timer">
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(+e.target.value)}
        onBlur={handleBlur}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
}
