import React from 'react';

import { useDrop } from 'react-dnd';

export default function Spot({ type, value, setValue }) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: type,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item) => {
      console.log(item);
      setValue(item.value);
    },
  });

  let backgroundColor = 'grey';
  if (canDrop) backgroundColor = '#3db897';
  if (isOver) backgroundColor = '#4bdcb5';

  return (
    <div className="spot" ref={dropRef} style={{ backgroundColor }}>
      {value}
    </div>
  );
}
