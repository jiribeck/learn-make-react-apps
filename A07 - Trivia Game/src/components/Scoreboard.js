import React, { useEffect, useState } from 'react';

export default function Scoreboard({ isCorrect, getNextQuestion }) {
  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);

  useEffect(() => {
    if (isCorrect === null) return;
    if (isCorrect === true) setCorrectScore((score) => score + 1);
    if (isCorrect === false) setWrongScore((score) => score + 1);
  }, [isCorrect]);

  function resetScore() {
    setCorrectScore(0);
    setWrongScore(0);
    if (correctScore !== 0 || wrongScore !== 0) getNextQuestion();
  }

  return (
    <div className="scoreboard">
      <div className="wrong">
        <strong>{wrongScore}</strong>
        <span>wrong</span>
      </div>
      <div className="correct">
        <strong>{correctScore}</strong>
        <span>correct</span>
      </div>
      <button onClick={resetScore}>Reset Score</button>
    </div>
  );
}
