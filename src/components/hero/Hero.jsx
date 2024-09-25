import React from 'react'
import './Hero.css'
import LoginButton from '../sesion/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'

const Hero = () => {
    const { isAuthenticated } = useAuth0()
return (
    <section className='section-headstream'>
                <div>
                        <h1>THE GOAT BET</h1>
            <p>
                Donde la pasión del fútbol se encuentra con la emoción de ganar.
                <span className="highlight"> Apuesta inteligente</span>, juega a lo grande
            </p>
                        {isAuthenticated ? null : <LoginButton />}
                </div>

                <div>
                        <img src="src/assets/pexels-unknown6user-1657332.jpg" alt="Futbol Image" />
                </div>

    </section>
)
}

export default Hero