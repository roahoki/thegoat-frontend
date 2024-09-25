import React from 'react'
import './Header.css'
import LoginButton from '../sesion/LoginButton'
import LogoutButton from '../sesion/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

const Header = () => {
  const {user,  isAuthenticated } = useAuth0()
  return (
    <header className='header'>
      
      <a href="/" className='logo'> THE GOAT BET </a>

      <nav className="navbar">
        <a href="/">HOME</a>
        <a href="/bonds">BONOS</a>
        <a href="/profile">PERFIL</a>
        {
          isAuthenticated ? <LogoutButton /> : <LoginButton />
        }
        
      </nav>
    </header>
  )
}

export default Header