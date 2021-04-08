import { useState, useEffect } from 'react';

export default function useMovement({ oneStepSize }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('down');
  const stepSize = oneStepSize;

  // add eventlistener to listen for arrow keys
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      const eKeyString = e.key;
      let moveString = eKeyString.toLowerCase().replace('arrow', '');
      move(moveString, stepSize);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stepSize]);

  function move(dir, step) {
    setDirection(dir);
    switch (dir) {
      case 'up':
        setY((y) => y - step);
        break;
      case 'left':
        setX((x) => x - step);
        break;
      case 'down':
        setY((y) => y + step);
        break;
      case 'right':
        setX((x) => x + step);
        break;
      default:
        break;
    }
  }
  return { x, y, direction, move, stepSize };
}
