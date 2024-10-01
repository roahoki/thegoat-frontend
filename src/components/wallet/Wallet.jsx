import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Wallet = () => {

  const { user, isAuthenticated } = useAuth0()
  return (
    <div>
      {isAuthenticated ? <h2>Saldo:</h2> : <h2>Debes iniciar sesión para ver tu saldo</h2>}
    </div>
  )
}

export default Wallet