import React, { useEffect, useRef } from 'react';
import './App.css';
import useMovement from './hooks/useMovement';

export default function App() {
  const { x, y, direction, move, stepSize } = useMovement({ oneStepSize: 20 });

  const canvasRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const linkDownRef = useRef(null);
  const linkRightRef = useRef(null);

  function drawCharacterOnCanvas(moveDirection, moveContext) {
    switch (moveDirection) {
      case 'up':
        moveContext.drawImage(linkUpRef.current, x, y);
        break;
      case 'left':
        moveContext.drawImage(linkLeftRef.current, x, y);
        break;
      case 'down':
        moveContext.drawImage(linkDownRef.current, x, y);
        break;
      case 'right':
        moveContext.drawImage(linkRightRef.current, x, y);
        break;
      default:
        break;
    }
  }

  // set width and height of canvas
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
  }, []);

  // move the box if x or y change
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
    // context.fillRect(x, y, 100, 100);
    drawCharacterOnCanvas(direction, context);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y]);

  return (
    <div className="app">
      <canvas ref={canvasRef} />

      <div className="arrows">
        <button onClick={() => move('up', stepSize)}>Up</button>
        <button onClick={() => move('left', stepSize)}>Left</button>
        <button onClick={() => move('down', stepSize)}>Down</button>
        <button onClick={() => move('right', stepSize)}>Right</button>
      </div>

      <div className="images">
        <img ref={linkUpRef} src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img
          ref={linkLeftRef}
          src="https://i.imgur.com/4LGAZ8t.gif"
          alt="Left"
        />
        <img
          ref={linkDownRef}
          src="https://i.imgur.com/JYUB0m3.png"
          alt="Down"
        />
        <img
          ref={linkRightRef}
          src="https://i.imgur.com/GEXD7bk.gif"
          alt="Right"
        />
      </div>
    </div>
  );
}
