import React from 'react'
import RenderCard from '../components/cards/RenderFixtureCard'
import LeagueCard from '../components/cards/LeagueCard'
import LeagueList from '../components/leagueItems/LeagueList'
import fixturesData from '../components/cards/fixtures.json'
import { FixturesProvider } from '../contexts/FixturesContext'
import DateSelector from '../components/dateSelector/DateSelector'

const Fixtures = () => {
  return (
    <FixturesProvider>
    <div>
      <LeagueList />
      <DateSelector />
      <LeagueCard />
      <RenderCard />
    </div>
    </FixturesProvider>
  )
}

export default Fixtures
