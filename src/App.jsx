import './App.css'

import { useAuth0 } from '@auth0/auth0-react'
import Hero from './components/hero/Hero'

function App() {

  const { user, isAuthenticated } = useAuth0()

  return (
    <div>
      <Hero />
    </div>
  )
}

export default App
