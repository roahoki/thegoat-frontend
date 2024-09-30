// LeagueList.jsx
import React, {useContext} from 'react';
import { FixturesContext } from '../../contexts/FixturesContext';
import './LeagueList.css';
import LeagueItem from './LeagueItem';
import fixturesData from '../cards/fixtures.json';


const LeagueList = () => {
    const { setSelectedLeague } = useContext(FixturesContext);

    // Extraer ligas únicas desde fixturesData
    const leagues = fixturesData.fixtures.reduce((acc, fixture) => {
        const league = fixture.league;
        if (!acc.some(l => l.id === league.id)) {
            acc.push({
                id: league.id,
                name: league.name,
                logo: league.logo
            });
        }
        return acc;
    }, []);

    const handleLeagueSelect = (leagueId) => {
        setSelectedLeague(leagueId);
    };

    return (
        <div className="league-list">
            {leagues.map(league => (
                <LeagueItem
                    key={league.id}
                    logo={league.logo}
                    name={league.name}
                    onClick={() => handleLeagueSelect(league.name)}
                />
            ))}
        </div>
    );
};

export default LeagueList;
