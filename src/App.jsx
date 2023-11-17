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
    if (!gameOver && turn === 0) {
      fetchPokemons();
    } else if (!gameOver && turn > 0) {
      shuffleAndSetPokemons();
    }
  }, [gameOver, turn]);


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

  const fetchPokemons = async () => {
    const pokemonIDs = new Set();
    while (pokemonIDs.size < 10) {
      const randomId = Math.floor(Math.random() * 150) + 1;
      pokemonIDs.add(randomId);
    }
  
    const pokemonPromises = Array.from(pokemonIDs).map(fetchPokemon);
    const pokemonData = await Promise.all(pokemonPromises);
    setPokemons(pokemonData);
    setIsReady(true);
  };
  

  const shuffleAndSetPokemons = () => {
    let shuffledPokemons = [...pokemons];
    shuffleArray(shuffledPokemons);
    setPokemons(shuffledPokemons);
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
        endGame(true);
      } else {
        setTurn(turn + 1); // Avanza al siguiente turno
      }
    }
  };

  const endGame = (win = false) => {
    setGameOver(true);
    setScore(win ? score : 0); // Si gana, mantiene el puntaje; si pierde, lo resetea a 0.

    // Reinicia el juego después de un breve retraso
    setTimeout(() => {
      setGameOver(false);
      setSelectedCards(new Set());
      setTurn(0);
      setIsReady(false);
      fetchPokemons();
    }, 3000); // 3 segundos de retraso antes de reiniciar
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
