import React, { useContext, useState, useEffect } from 'react'
import Card from './FixtureCard'
import fixturesData from './fixtures.json'
import { FixturesContext } from '../../contexts/FixturesContext'

const RenderCard = () => {
    const { selectedLeague, setSelectedLeague, selectedDate, setSelectedDate } = useContext(FixturesContext)
    const [visibleCount, setVisibleCount] = useState(3) // Estado para controlar cuántos resultados se muestran

    // Si selectedLeague es null, tomar la primera liga en fixturesData
    const leagueToFilter = selectedLeague || fixturesData.fixtures[0].league.name

    useEffect(() => {
        setSelectedLeague(leagueToFilter)
    }, [leagueToFilter, setSelectedLeague])

    // Reiniciar visibleCount y selectedDate cuando cambie selectedLeague
    useEffect(() => {
        setVisibleCount(3)
        setSelectedDate(null)
    }, [selectedLeague, setSelectedDate])

    // Reiniciar visibleCount cuando cambie selectedDate
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

    return (
        <div>
            {cardsData.slice(0, visibleCount).map((card, index) => (
                <Card
                    key={index}
                    home={card.home}
                    away={card.away}
                    date={card.date}
                    odd_home={card.odd_home}
                    odd_draw={card.odd_draw}
                    odd_visit={card.odd_visit}
                />
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