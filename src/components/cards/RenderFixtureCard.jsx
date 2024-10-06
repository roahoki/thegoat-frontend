import React, { useContext, useState, useEffect } from 'react'
import Card from './FixtureCard'
// import fixturesData from './fixtures.json'
import { FixturesContext } from '../../contexts/FixturesContext'

const RenderCard = () => {
    const { selectedLeague, setSelectedLeague, selectedDate, setSelectedDate, selectedCard, setSelectedCard, fixturesData} = useContext(FixturesContext)
    const [visibleCount, setVisibleCount] = useState(5) // Estado para controlar cuántos resultados se muestran
    // console.log(fixturesData.fixtures); // aqui tenemos el array de fixtures
    // console.log(fixturesData.fixtures[0].date);
    
    // Si selectedLeague es null, tomar la primera liga en fixturesData
    const leagueToFilter = selectedLeague || fixturesData.fixtures[0].league.name

    

    useEffect(() => {
        setSelectedLeague(leagueToFilter)
    }, [leagueToFilter, setSelectedLeague])

    // Reiniciar visibleCount y selectedDate cuando cambie selectedLeague
    useEffect(() => {
        setVisibleCount(5)
        setSelectedDate(null)
    }, [selectedLeague, setSelectedDate])

    // Reiniciar visibleCount cuando cambie selectedDate
    useEffect(() => {
        setVisibleCount(5)
    }, [selectedDate])

    const filteredFixtures = fixturesData.fixtures.filter(fixture => {
        const isLeagueMatch = fixture.league.name === leagueToFilter
        const fixtureDate = fixture.date.split('T')[0] // Obtener solo la parte de la fecha
        
        const isDateMatch = selectedDate ? fixtureDate >= selectedDate : true

        return isLeagueMatch && isDateMatch
    })
    console.log(filteredFixtures);

    const cardsData = filteredFixtures.map(fixture => {
        const homeOdd = fixture.odds.find(odd => odd.value === "Home")?.odd || 'N/A';
        const drawOdd = fixture.odds.find(odd => odd.value === "Draw")?.odd || 'N/A';
        const awayOdd = fixture.odds.find(odd => odd.value === "Away")?.odd || 'N/A';

        return {
            home: fixture.homeTeam.name,
            away: fixture.awayTeam.name,
            date: new Date(fixture.date).toLocaleString(),
            odd_home: homeOdd,
            odd_draw: drawOdd,
            odd_visit: awayOdd
        }
    });

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 3)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
        console.log("Selected card:", card);
        
    }

    return (
        <div>
            {/* <p>prueba</p>
            {JSON.stringify(filteredFixtures)} */}
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