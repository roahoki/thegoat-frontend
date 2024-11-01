import React, { useContext, useState, useEffect } from 'react'
import Card from './FixtureCard'
import { FixturesContext } from '../../contexts/FixturesContext'

const RenderRecommendedFixtures = (recommendedFixtures) => {
    const { selectedCard, setSelectedCard } = useContext(FixturesContext)
    
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }
 // Convertir recommendedFixtures en un array
    // const fixturesObject = Object.fromEntries(recommendedFixtures);
    // const fixturesArray = Object.values(fixturesObject);
    console.log('inside', recommendedFixtures);
    const cardsData = recommendedFixtures.map(fixture => {
        const homeOdd = fixture.odds.find(odd => odd.value === "Home")?.odd || 'N/A';
        const drawOdd = fixture.odds.find(odd => odd.value === "Draw")?.odd || 'N/A';
        const awayOdd = fixture.odds.find(odd => odd.value === "Away")?.odd || 'N/A';

        return {
            home: fixture.homeTeam.name,
            away: fixture.awayTeam.name,
            date: new Date(fixture.date).toLocaleString(),
            odd_home: homeOdd,
            odd_draw: drawOdd,
            odd_visit: awayOdd,
            fixture_id: fixture.id,
            round: fixture.league.round,
            league_name: fixture.league.name,
            available_bonds: fixture.available_bonds
        }
    });

    return (
        <div>
            {cardsData.slice(0, visibleCount).map((card, index) => (
                <div key={index} onClick={() => handleCardClick(card)}>
                    <Card
                        home={card.home}
                        away={card.away}
                        date={card.date}
                        odd_home={card.odd_home}
                        odd_draw={card.odd_draw}
                        odd_visit={card.odd_visit}
                        fixture_id={card.fixture_id}
                        round={card.round}
                        league_name={card.league_name}
                        available_bonds={card.available_bonds}

                    />
                </div>
            ))}
            {cardsData.length === 0 && (
                <p>Esta liga no tiene partidos disponibles</p>
            )}
        </div>
    )
    }

export default RenderRecommendedFixtures
