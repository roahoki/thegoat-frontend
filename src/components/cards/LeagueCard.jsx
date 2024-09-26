
import React, { useContext } from 'react';
import { FixturesContext } from '../../contexts/FixturesContext';
import './LeagueCard.css' 

const LeagueCard = ({league, country}) => {

    const { selectedLeague } = useContext(FixturesContext)
    return (
        <div className="card">
                <h3>{selectedLeague}</h3>
                <h3>Resultado del Partido</h3>

        </div>
    )
}

export default LeagueCard