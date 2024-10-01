import React, { useContext, useState, useEffect } from 'react'
import Card from './FixtureCard'
import { FixturesContext } from '../../contexts/FixturesContext'

const RenderCard = () => {
    const { selectedLeague, setSelectedLeague, selectedDate, setSelectedDate, selectedCard, setSelectedCard } = useContext(FixturesContext)
    const [visibleCount, setVisibleCount] = useState(3) // Estado para controlar cuántos resultados se muestran
    const [fixturesData, setFixturesData] = useState({ fixtures: [] }) // Estado para los datos de los fixtures

    // Si selectedLeague es null, tomar la primera liga en fixturesData
    const leagueToFilter = selectedLeague || (fixturesData.fixtures[0] && fixturesData.fixtures[0].league.name)

    useEffect(() => {
        // Realizar la solicitud GET a la API
        fetch('/api/fixtures/data')
            .then(response => response.json())
            .then(data => {
                setFixturesData(data)
                if (!selectedLeague && data.fixtures.length > 0) {
                    setSelectedLeague(data.fixtures[0].league.name)
                }
            })
            .catch(error => console.error('Error fetching fixtures:', error))
    }, [setSelectedLeague, selectedLeague])

    useEffect(() => {
        setVisibleCount(3)
        setSelectedDate(null)
    }, [selectedLeague, setSelectedDate])

    useEffect(() => {
        setVisibleCount(3)
    }, [selectedDate])

    const filteredFixtures = fixturesData.fixtures.filter(fixture => {
        const isLeagueMatch = fixture.league.name === leagueToFilter
        const fixtureDate = fixture.fixture.date.split('T')[0] // Obtener solo la parte de la fecha
        const isDateMatch = selectedDate ? fixtureDate >= selectedDate : true

        return isLeagueMatch && isDateMatch
    })

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

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 3)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
        console.log("Selected card:", card);

    }

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
                    />
                </div>
            ))}
            {visibleCount < cardsData.length && (
                <button onClick={handleLoadMore}>Cargar más</button>
            )}
            {cardsData.length === 0 && (
                <p>Esta liga no tiene partidos disponibles</p>
            )}
        </div>
    )
}

export default RenderCard