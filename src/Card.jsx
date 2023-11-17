import React from 'react';
import './Card.css'; // Asegúrate de crear y estilizar este archivo CSS

const Card = ({ pokemon, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <h2 className="pokemon-name">{pokemon.name}</h2>
        </div>
    );
};

export default Card;
