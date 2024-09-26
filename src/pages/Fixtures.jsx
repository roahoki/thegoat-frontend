import React from 'react'
import RenderCard from '../components/cards/RenderFixtureCard'
import LeagueCard from '../components/cards/LeagueCard'
import LeagueList from '../components/leagueItems/LeagueList'
import fixturesData from '../components/cards/fixtures.json'
import { FixturesProvider } from '../contexts/FixturesContext'

const Fixtures = () => {
  return (
    <FixturesProvider>
    <div>
      <LeagueList />
      <LeagueCard />
      <RenderCard />
    </div>
    </FixturesProvider>
  )
}

export default Fixtures
