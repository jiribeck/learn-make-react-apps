import React, { useEffect, useState } from 'react';

import useCountDown from 'react-countdown-hook';

import './App.css';

// to calculate typing speed
// words typed / minutes
// words typed = (characters - typos) / 5

const secondsToCount = 2;

const paragraph = `Hello world! Coding is the best. We are able to build something from scratch. It is literally imagination incarnate. Solving our own problems through coding is one of the coolest things we could do!`;

export default function App() {
  const [timeLeft, { start, reset }] = useCountDown(secondsToCount * 1000, 100);

  const [typedText, setTypedText] = useState('');
  const [typoIndexes, setTypoIndexes] = useState([]);

  const [wpm, setWpm] = useState();

  function findTypos(str1, str2) {
    let typos = [];
    str2.split('').forEach((character, index) => {
      if (character !== str1.split('')[index]) typos.push(index);
    });
    return typos;
  }

  function startTimer() {
    setTypedText('');
    start();
  }

  function resetTimer() {
    setTypedText('');
    setWpm();
    reset();
  }

  // Finding Typos
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTypoIndexes(findTypos(paragraph, typedText));
  }, [typedText]);

  // Showing alert and counting WPM
  useEffect(() => {
    if (timeLeft !== 0 || typedText.length === 0) return;

    // Calculate WPM
    const wordsTyped = (typedText.length - typoIndexes.length) / 5;
    const minMultiplier = 60 / secondsToCount;
    setWpm((wordsTyped * minMultiplier).toFixed(2));
  }, [wpm, timeLeft, typedText.length, typoIndexes.length]);

  return (
    <div className="app">
      {/* sidebar */}
      <div className="sidebar">
        <div className="timer">{(timeLeft / 1000).toFixed(2)}</div>
        <button className="start" onClick={() => startTimer()}>
          Start
        </button>
        <button className="reset" onClick={() => resetTimer()}>
          Reset
        </button>
        {wpm && <div>You typed at: {wpm}</div>}
      </div>

      <div className="content">
        {/* show the paragraph */}
        <p>
          {paragraph.split('').map((character, index) => {
            let characterClass = '';
            const hasBeenTyped = index < typedText.split('').length;
            if (hasBeenTyped) {
              const isTypo = typoIndexes.includes(index);
              characterClass = isTypo ? 'incorrect' : 'correct';
            }

            return (
              <span key={index} className={characterClass}>
                {character}
              </span>
            );
          })}
        </p>

        {/* show the textarea */}
        <form>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            rows="10"
            placeholder="Test your typing skills..."
          />
        </form>
      </div>
    </div>
  );
}
