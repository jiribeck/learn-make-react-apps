import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

import { loading, getPokemons } from './hooks/usePokemons';
import PokemonCard from './components/PokemonCard';

// image for the pokemon done
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png MAX=874

const pokemons = getPokemons();

export default function App() {
  const [opened, setOpened] = useState([]);
  const [match, setMatch] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1IsPlaying, setPlayer1IsPlaying] = useState(true);

  const updatePlay = useCallback(() => {
    if (opened.length === 2) {
      if (pokemons[opened[0]].id === pokemons[opened[1]].id) {
        setMatch((match) => [...match, ...opened]);
        player1IsPlaying
          ? setPlayer1Score((player1Score) => player1Score + 1)
          : setPlayer2Score((player2Score) => player2Score + 1);
      } else {
        setTimeout(() => {
          setPlayer1IsPlaying((setPlayer1IsPlaying) => !setPlayer1IsPlaying);
        }, 1000);
      }
      setTimeout(() => {
        setOpened([]);
      }, 600);
    }
  }, [opened, setOpened, setMatch, player1IsPlaying]);

  useEffect(() => {
    console.log(loading);
    updatePlay();
  }, [updatePlay]);

  // console.log(pokemons);

  return (
    <div className="app">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>
          {player1Score}{' '}
          <strong
            style={{ textDecoration: player1IsPlaying ? 'underline' : '' }}
          >
            Score Player 1
          </strong>
        </p>
        <p>
          {player2Score}{' '}
          <strong
            style={{ textDecoration: !player1IsPlaying ? 'underline' : '' }}
          >
            Score Player 2
          </strong>
        </p>
      </div>

      <div className="cards">
        {!loading &&
          pokemons.map((pokemon, index) => {
            let isFlipped = false;
            const isOpened = opened.includes(index);
            const isMatched = match.includes(index);
            if (isOpened || isMatched) isFlipped = true;

            return (
              <PokemonCard
                key={index}
                pokemon={pokemon}
                isFlipped={isFlipped}
                opened={opened}
                setOpened={setOpened}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}
