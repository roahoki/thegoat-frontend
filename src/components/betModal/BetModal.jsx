import React, { useContext, useState } from 'react'
import { FixturesContext } from '../../contexts/FixturesContext'
import './BetModal.css'

const BetModal = () => {
    const { selectedCard, setSelectedCard } = useContext(FixturesContext)

    const [selectedOdd, setSelectedOdd] = useState(null)
    const [selectedAmount, setSelectedAmount] = useState(1)
    const [betAmount, setBetAmount] = useState('')

    if (!selectedCard) return null

    const handleClose = () => {
        setSelectedCard(null)
        setBetAmount('')
        setSelectedAmount(1)
        setSelectedOdd(null)
    }

    const handleBet = () => {
        const betRequest = {
            card: selectedCard,
            odd: selectedOdd,
            amount: betAmount,
            bonuses: selectedAmount
        }
        console.log('Bet Request:', betRequest)
        handleClose();        
    }

    const handleOddSelection = (odd) => {
        setSelectedOdd(odd)
    }

    return (
        <div className="bet-modal">
            <div className="bet-modal-content">
                <h3>{selectedCard.home} vs {selectedCard.away}</h3>
                <p>X bonos disponibles</p>

                <div className='odds-options'>
                    <div
                        className={selectedOdd === selectedCard.odd_home ? 'selected' : ''}
                        onClick={() => handleOddSelection(selectedCard.odd_home)}
                    >
                        <h5>{selectedCard.home}</h5>
                        <p>{selectedCard.odd_home}</p>
                    </div>

                    <div
                        className={selectedOdd === selectedCard.odd_visit ? 'selected' : ''}
                        onClick={() => handleOddSelection(selectedCard.odd_visit)}
                    >
                        <h5>{selectedCard.away}</h5>
                        <p>{selectedCard.odd_visit}</p>
                    </div>

                    <div
                        className={selectedOdd === selectedCard.odd_draw ? 'selected' : ''}
                        onClick={() => handleOddSelection(selectedCard.odd_draw)}
                    >
                        <h5>Empate</h5>
                        <p>{selectedCard.odd_draw}</p>
                    </div>
                </div>

                <div className='user-bet-options'>
                    <div>
                        <p>Saldo $X</p>
                        <input
                            type="number"
                            placeholder="Monto de la apuesta"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <p>Bonos</p>
                        <input
                            type="number"
                            placeholder="Cantidad de bonos"
                            value={selectedAmount}
                            onChange={(e) => setSelectedAmount(e.target.value)}
                        />
                    </div>
                </div>

                <button onClick={handleBet}>Realizar Apuesta</button>
                <button onClick={handleClose}>Cerrar</button>
            </div>
        </div>
    )
}

export default BetModal