import React, { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { evaluate } from 'mathjs';

import Card from './components/Card';
import Spot from './components/Spot';
import './App.css';

export default function App() {
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(3);
  const [operator, setOperator] = useState('/');
  const [result, setResult] = useState(0);

  useEffect(() => {
    switch (operator) {
      case '+':
        setResult(number1 + number2);
        break;
      case '-':
        setResult(number1 - number2);
        break;
      case '*':
        setResult(number1 * number2);
        break;
      case '/':
        setResult(Math.round((number1 / number2) * 10) / 10);
        break;
      default:
        break;
    }
  }, [number1, number2, operator, result]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* math card */}
        <div className="math-card">
          <Spot type="number" value={number1} setValue={setNumber1} />
          <Spot type="number" value={number2} setValue={setNumber2} />
          <Spot type="operator" value={operator} setValue={setOperator} />
          <div className="total">{result}</div>
        </div>

        <div>
          <div className="cards numbers">
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Card type="number" key={i} text={i + 1} />
              ))}
          </div>

          <div className="cards operators">
            {['+', '-', '*', '/'].map((o, i) => (
              <Card type="operator" key={i} text={o} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
