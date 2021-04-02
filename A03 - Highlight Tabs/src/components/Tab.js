import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Tab(props) {
  // Chris to řeší tak, že přidá jako props {children}, takže pak přidá do componenty <a>Label</a>
  const [highlightStyle, setHighlightStyle] = useState({
    left: -1500,
    opacity: 0,
  });

  function moveHighlight(e) {
    setHighlightStyle({ left: e.nativeEvent.layerX - 150 }); // e.nativeEvent.layerX je X souřadnice danýho elemnenu
    // console.log(e.currentTarget.offsetWidth); //Šířka elementu - v tomto případě ale až a, protože div.highlight má "pointer-events: none"
  }

  function hideHighlight() {
    setHighlightStyle({ left: -150, opacity: 0 });
  }

  return (
    <div className="tab" onMouseOut={hideHighlight} onMouseMove={moveHighlight}>
      <div className="highlight" style={highlightStyle} />
      <NavLink activeClassName="is-active" to={props.to} exact={true}>
        {props.label}
      </NavLink>
    </div>
  );
}
