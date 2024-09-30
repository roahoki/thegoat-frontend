import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Wallet = () => {

  const { user, isAuthenticated } = useAuth0()
  return (
    <div>
      {isAuthenticated ? <p>Saldo: $1000</p> : <p>Debes iniciar sesión para ver tu saldo</p>}
    </div>
  )
}

export default Wallet