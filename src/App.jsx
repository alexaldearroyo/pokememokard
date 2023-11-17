import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [turn, setTurn] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchAndShufflePokemons();
  }, [turn]);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    };
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const fetchAndShufflePokemons = async () => {
    const pokemonPromises = [];
    for (let i = 0; i < 10; i++) {
      const randomId = Math.floor(Math.random() * 150) + 1;
      pokemonPromises.push(fetchPokemon(randomId));
    }
    let pokemonData = await Promise.all(pokemonPromises);
    shuffleArray(pokemonData); // Mezcla las cartas
    setPokemons(pokemonData);
    setIsReady(true); // Establece que las cartas están listas para ser clickeadas
  };

  const handleCardClick = (pokemonId) => {
    if (!isReady) return; // Evita hacer clic si las cartas no están listas

    if (selectedCards.has(pokemonId)) {
      setGameOver(true); // Termina el juego si la carta ya fue seleccionada
      setScore(0); // Reinicia la puntuación
    } else {
      setSelectedCards(new Set([...selectedCards, pokemonId]));
      setScore(score + 1);

      if (turn + 1 >= 10) {
        // Termina el juego después de 10 turnos exitosos
        setGameOver(true);
      } else {
        setTurn(turn + 1); // Avanza al siguiente turno
      }
    }
  };

  return (
    <div className="app">
      <div className="score">Points: {score}</div>
      {gameOver && <div className="game-over">Game Over! Start Again.</div>}
      <div className="card-grid">
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
