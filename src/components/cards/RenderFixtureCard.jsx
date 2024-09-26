import React, { useContext } from 'react'
import Card from './FixtureCard'
import fixturesData from './fixtures.json'
import { FixturesContext } from '../../contexts/FixturesContext'
const RenderCard = () => {
    const { selectedLeague } = useContext(FixturesContext)

    const filteredFixtures = fixturesData.fixtures.filter(fixture => fixture.league.name === selectedLeague)

    const cardsData = filteredFixtures.map(fixture => {
        const homeOdd = fixture.odds[0]?.values.find(value => value.value === "Home")?.odd || 'N/A';
        const drawOdd = fixture.odds[0]?.values.find(value => value.value === "Draw")?.odd || 'N/A';
        const awayOdd = fixture.odds[0]?.values.find(value => value.value === "Away")?.odd || 'N/A';

        return {
            home: fixture.teams.home.name,
            away: fixture.teams.away.name,
            date: new Date(fixture.fixture.date).toLocaleString(),
            odd_home: homeOdd,
            odd_draw: drawOdd,
            odd_visit: awayOdd
        }
    })

    return (
        <div>
            {cardsData.length > 0 ? (
                cardsData.map((card, index) => (
                    <Card
                        key={index}
                        home={card.home}
                        away={card.away}
                        date={card.date}
                        odd_home={card.odd_home}
                        odd_draw={card.odd_draw}
                        odd_visit={card.odd_visit}
                    />
                ))
            ) : (
                <p>Esta liga no tiene partidos disponibles</p>
            )}
        </div>
    )
}

export default RenderCard