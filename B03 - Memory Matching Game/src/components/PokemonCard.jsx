import React from 'react';

import { getPokemonImage } from '../hooks/usePokemons';
import background from '../images/logo512.png';

export default function PokemonCard({
  index,
  pokemon,
  isFlipped,
  opened,
  setOpened,
}) {
  const { name, id } = pokemon;

  function flipCard(index) {
    if (opened.length <= 1) setOpened((opened) => [...opened, index]);
  }

  const flipThisCard = () => flipCard(index);
  const getThisPokemonImage = getPokemonImage(id);

  return (
    <button
      onClick={flipThisCard}
      className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}
    >
      <div className="inner">
        <div className="front">
          <img src={getThisPokemonImage} alt={name} width="90" />
        </div>
        <div
          className="back"
          style={{ backgroundImage: `url(${background})` }}
        />
      </div>
    </button>
  );
}
