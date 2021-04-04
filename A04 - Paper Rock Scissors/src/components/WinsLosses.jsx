import React from 'react';

export default function WinsLosses(props) {
  return (
    <div className="wins-losses">
      <div className="wins">
        <span className="number">{props.wins}</span>
        <span className="text">{props.wins === 1 ? 'Win' : 'Wins'}</span>
      </div>

      <div className="losses">
        <span className="number">{props.losses}</span>
        <span className="text">{props.losses === 1 ? 'Loss' : 'Losses'}</span>
      </div>
      <button style={{ marginLeft: 20, border: 2 }} onClick={props.resetGame}>
        Reset
      </button>
    </div>
  );
}
