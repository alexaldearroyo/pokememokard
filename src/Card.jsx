import React from 'react';
import './Card.css'; // Asegúrate de crear y estilizar este archivo CSS

const Card = ({ card, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={card.image} alt={card.name} className="card-image" />
            <h2 className="card-name">{card.name}</h2>
        </div>
    );
};

export default Card;
