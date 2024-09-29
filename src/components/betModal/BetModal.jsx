import React, { useContext } from 'react'
import { FixturesContext } from '../../contexts/FixturesContext'
import './BetModal.css'

const BetModal = () => {
    const { selectedCard, setSelectedCard } = useContext(FixturesContext)

    if (!selectedCard) return null

    const handleClose = () => {
        setSelectedCard(null)
    }

    const handleBet = () => {
        // Lógica para realizar la apuesta
        console.log('Apuesta realizada para:', selectedCard)
        setSelectedCard(null)
    }

    return (
        <div className="bet-modal">
            <div className="bet-modal-content">
                <h2>Tu apuesta</h2>
                <p>{selectedCard.home} vs {selectedCard.away}</p>
                <p>{selectedCard.odd_draw}</p>
                <p>{selectedCard.odd_home}</p>
                <p>{selectedCard.odd_visit}</p>
                <button onClick={handleBet}>Realizar Apuesta</button>
                <button onClick={handleClose}>Cerrar</button>

            </div>
        </div>
    )
}

export default BetModal