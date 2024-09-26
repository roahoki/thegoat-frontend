import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './LogButton.css'

const LoginButton = () => {
    
    const { loginWithRedirect } = useAuth0();
    return (
        <button onClick={() => loginWithRedirect()}>LOG IN</button>
    )
}

export default LoginButton