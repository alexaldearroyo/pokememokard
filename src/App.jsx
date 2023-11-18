import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

const App = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [turn, setTurn] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!gameOver && turn === 0) {
      fetchCards();
    } else if (!gameOver && turn > 0) {
      shuffleAndSetCards();
    }
  }, [gameOver, turn]);

  const fetchCard = async (id) => {
    const response = await fetch(`https://triad.raelys.com/api/cards/${id}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.image,
    };
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const fetchCards = async () => {
    const cardIDs = new Set();
    while (cardIDs.size < 10) {
      const randomId = Math.floor(Math.random() * 150) + 1;
      cardIDs.add(randomId);
    }

    const cardPromises = Array.from(cardIDs).map(fetchCard);
    const cardData = await Promise.all(cardPromises);
    setCards(cardData);
    setIsReady(true);
  };

  const shuffleAndSetCards = () => {
    let shuffledCards = [...cards];
    shuffleArray(shuffledCards);
    setCards(shuffledCards);
  };

  const handleCardClick = (cardId) => {
    if (!isReady) return; // Avoid clicking if the cards are not ready

    if (selectedCards.has(cardId)) {
      setGameOver(true); // End the game if the card has already been selected
      setShowModal(true);
    } else {
      setSelectedCards(new Set([...selectedCards, cardId]));
      setScore(score + 1);

      if (turn + 1 >= 10) {
        setGameOver(true);
        setShowModal(true);
      } else {
        setTurn(turn + 1); // Move to the next turn
      }
    }
  };

  const endGame = () => {
    setShowModal(false);
    setGameOver(false);
    setSelectedCards(new Set());
    setScore(0);
    setTurn(0);
    setIsReady(false);
    fetchCards();
  };

  return (
    <div className="app">
      <header className="app-header">Triple Triad Memory</header>

      <div className="score">Points: {score}</div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{gameOver ? "Game Over!" : "Congratulations!"}</p>
            <button onClick={endGame}>Play Again</button>
          </div>
        </div>
      )}
      <footer className="app-footer">
        Alex Arroyo © 2023 -
        <a
          href="https://github.com/alexaldearroyo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default App;
