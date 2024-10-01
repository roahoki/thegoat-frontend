import React from 'react'
import './Hero.css'
import LoginButton from '../sesion/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'

const Hero = () => {
    const { isAuthenticated } = useAuth0()
return (
    <section className='section-headstream'>
                <div>
                <h1 style={{ color: 'var(--color-primary)' }}>THE GOAT BET</h1>
            <p>
                Donde la pasión del fútbol es la emoción de ganar.
                <span className="highlight"> Apuesta inteligente</span>, juega a lo grande
            </p>
        
                </div>

                <div className='imgcontainer'>
                        <img src="src/assets/pexels-unknown6user-1657332.jpg" alt="Futbol Image" />
                </div>

    </section>
)
}

export default Hero