import React from 'react'
import Card from './FixtureCard'
import fixturesData from './fixtures.json'

// const fixturesData = {
//     "fixtures": [
//         {
//             "fixture": {
//                 "id": 1208074,
//                 "referee": "P. Bankes",
//                 "timezone": "UTC",
//                 "date": "2024-09-28T14:00:00+00:00",
//                 "timestamp": 1727532000,
//                 "status": {
//                     "long": "Not Started",
//                     "short": "NS",
//                     "elapsed": null
//                 }
//             },
//             "league": {
//                 "id": 39,
//                 "name": "Premier League",
//                 "country": "England",
//                 "logo": "https://media.api-sports.io/football/leagues/39.png",
//                 "flag": "https://media.api-sports.io/flags/gb.svg",
//                 "season": 2024,
//                 "round": "Regular Season - 6"
//             },
//             "teams": {
//                 "home": {
//                     "id": 49,
//                     "name": "Chelsea",
//                     "logo": "https://media.api-sports.io/football/teams/49.png",
//                     "winner": null
//                 },
//                 "away": {
//                     "id": 51,
//                     "name": "Brighton",
//                     "logo": "https://media.api-sports.io/football/teams/51.png",
//                     "winner": null
//                 }
//             },
//             "goals": {
//                 "home": null,
//                 "away": null
//             },
//             "odds": [
//                 {
//                     "id": 1,
//                     "name": "Match Winner",
//                     "values": [
//                         {
//                             "value": "Home",
//                             "odd": "1.72"
//                         },
//                         {
//                             "value": "Draw",
//                             "odd": "4.30"
//                         },
//                         {
//                             "value": "Away",
//                             "odd": "4.55"
//                         }
//                     ]
//                 }
//             ]
//         }]};

const RenderCard = () => {
    const cardsData = fixturesData.fixtures.map(fixture => {
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
            {cardsData.map((card, index) => (
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
        </div>
    )
}

export default RenderCard