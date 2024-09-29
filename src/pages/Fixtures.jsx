import React from 'react'
import RenderCard from '../components/cards/RenderFixtureCard'
import LeagueCard from '../components/cards/LeagueCard'
import LeagueList from '../components/leagueItems/LeagueList'
import { FixturesProvider } from '../contexts/FixturesContext'
import DateSelector from '../components/dateSelector/DateSelector'
import BetModal from '../components/betModal/BetModal'

const Fixtures = () => {
  return (
    <FixturesProvider>
    <div>
      <LeagueList />
      <DateSelector />
      <LeagueCard />
      <BetModal />
      <RenderCard />
    </div>
    </FixturesProvider>
  )
}

export default Fixtures
