import React, { useEffect, useState, useCallback } from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {
  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);

  const getQuestion = useCallback(() => {
    setIsCorrect(null);
    let url = `https://opentdb.com/api.php?amount=1`;
    if (selectedCategory !== 'any') {
      url += `&category=${selectedCategory}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.results[0]);
      });
  }, [selectedCategory]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion, selectedCategory]);

  useEffect(() => {
    console.log('isCorrect', isCorrect);
  }, [isCorrect]);

  function handleQuestionAnswered(answer) {
    const isAnswerCorrect = answer === question.correct_answer;
    isAnswerCorrect
      ? setCorrectScore((score) => score + 1)
      : setWrongScore((score) => score + 1);
    setIsCorrect(isAnswerCorrect);
  }

  function resetScore() {
    setCorrectScore(0);
    setWrongScore(0);
    getQuestion();
  }

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && (
        <ResultModal
          isCorrect={isCorrect}
          question={question}
          getQuestion={getQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector
          category={selectedCategory}
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard correct={correctScore} wrong={wrongScore} />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && (
          <Question
            question={question}
            answerQuestion={handleQuestionAnswered}
          />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <div style={{ display: 'flex' }}>
          <button onClick={resetScore}>Reset Score</button>
          <button onClick={getQuestion}>Go to next question 👉</button>
        </div>
      </div>
    </div>
  );
}
