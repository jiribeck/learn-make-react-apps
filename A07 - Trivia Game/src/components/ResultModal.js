import React from 'react';

export default function ResultModal({ isCorrect, question, getNextQuestion }) {
  return (
    <div className={`result-modal ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
      <div className="overlay" />
      <div className="result-modal-content">
        {isCorrect && (
          <h3>
            <span role="img" aria-label="you rock">
              👊👊👊
            </span>
            <br />
            YOU WON!
          </h3>
        )}
        {!isCorrect && (
          <h3>
            <span role="img" aria-label="sad face">
              😟😢😟
            </span>
            <br />
            YOU LOST!
          </h3>
        )}

        {isCorrect === false && (
          <div className="correct-answer">
            <small>The correct answer was:</small>
            <br />
            <strong
              dangerouslySetInnerHTML={{ __html: question.correct_answer }}
            />
          </div>
        )}

        <button onClick={getNextQuestion}>
          Go to next question{' '}
          <span role="img" aria-label="next">
            👉
          </span>
        </button>
      </div>
    </div>
  );
}
