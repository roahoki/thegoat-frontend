import './App.css'

import { useAuth0 } from '@auth0/auth0-react'

function App() {

  const { user, isAuthenticated } = useAuth0()

  return (
    <>
    <div>
      <h1>HOME oauth</h1>

    </div>
    </>
  )
}

export default App
