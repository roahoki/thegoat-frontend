import React from 'react'
import './FixtureCard.css' 

const Card = ({ home, away, date, odd_home, odd_draw, odd_visit, fixture_id, round, league_name, available_bonds}) => {
    return (
        <div className="cardd">

            <div className='teams-container'>
                <h4>{home}</h4>
                <h4>{away}</h4>
                <p>{date}</p>
            </div>

            <div className='bond-container'>
                <h3>bonos</h3>
                <p>{available_bonds} disponibles</p>
            </div>

            <div className='oddss'>
                <div className='stats'>
                    <h4>{home}</h4>
                    <p>{odd_home}</p>
                </div>

                <div className='stats'>
                    <h4>Empate</h4>
                    <p>{odd_draw}</p>
                </div>

                <div className='stats'>
                    <h4>{away}</h4>
                    <p>{odd_visit}</p>
                </div>
            </div>

        </div>
    );
}

export default Card;
