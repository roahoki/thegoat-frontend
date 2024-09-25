import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Bonds = () => {
    const {user, isAuthenticated } = useAuth0()
    return (
        <div>
        Próximamente podrás ver tus bonos aquí
        </div>
    )
}

export default Bonds
