import React from 'react';

import { useDrag } from 'react-dnd';

export default function Card({ type, text }) {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: type,
    item: { type, value: text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  return (
    <div ref={dragRef} className="card" style={{ opacity }}>
      {text}
    </div>
  );
}
