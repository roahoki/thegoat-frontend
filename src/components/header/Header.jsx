//PENDIENTE HACER ALGO PARA QUE LAS OPCIONES QUE TIENEN XX SOLO APARZCAN A ADMIN O TIREN ERROR A LOS QUE NO SON ADMIN; 
//A MI ME TINCA QUE SEA UN BOTON ADMIN Y QUE SI LO APRIETAN O TIRA ERROR; O BAJAN LAS 3 OPCIONES

import React, { useState } from 'react';
import './Header.css';
import LoginButton from '../sesion/LoginButton';
import LogoutButton from '../sesion/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen((prev) => !prev);
  };

  return (
    <header className='header'>
      <a href="/" className='logo'> THE GOAT BET </a>

      <nav className="navbar">
        <a href="/">HOME</a>
        <a href="/fixtures">BET</a>
        <a href="/bonds">MIS BONOS</a>
        <a href="/admin/bonds/avail">ADMIN DEALS</a>
        <div 
          className="dropdown" 
          onMouseEnter={toggleAdminMenu} 
          onMouseLeave={toggleAdminMenu}
        >
          <a href="#" className="dropdown-title">ADMIN</a>
          {isAdminMenuOpen && (
            <div className="dropdown-menu">
              <a href="/admin/bonds">BONOS RESERVADOS</a>
              <a href="/admin/auctions">SUBASTAS ACTIVAS</a>
              <a href="/admin/auctions/offers">OFERTAS RECIBIDAS</a>
              <a href="/admin/auctions/proposals">MIS OFERTAS</a>
            </div>
          )}
        </div>
        <a href="/recommendations">HOT BETS</a>
        <a href="/profile">PERFIL</a>
      </nav>

      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </header>
  );
};

export default Header;
