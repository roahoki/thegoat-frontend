// LeagueItem.jsx
import React from 'react';
import './LeagueItem.css';

const LeagueItem = ({ logo, name, onClick }) => {
    return (
        <div className="league-item" onClick={onClick}>
            <img src={logo} alt={`logo`} className="league-logo" />
            <p className="league-name">{name}</p>
        </div>
    );
};

export default LeagueItem;
