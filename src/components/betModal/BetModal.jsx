import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FixturesContext } from '../../contexts/FixturesContext';
import './BetModal.css';

const BetModal = () => {
    const { selectedCard, setSelectedCard } = useContext(FixturesContext);

    const [selectedOdd, setSelectedOdd] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [betAmount, setBetAmount] = useState('');

    if (!selectedCard) return null;

    const handleClose = () => {
        setSelectedCard(null);
        setBetAmount('');
        setSelectedAmount(1);
        setSelectedOdd(null);
    };

    const handleBet = async () => {
        const betRequest = {
            group_id: '15', // Asumiendo que el group_id es 15
            fixture_id: selectedCard.id,
            league_name: selectedCard.league,
            round: selectedCard.round,
            date: selectedCard.date,
            result: selectedOdd,
            deposit_token: '', // Asumiendo que no hay token de depósito
            datetime: new Date().toISOString(),
            quantity: selectedAmount,
            user_id: 1, // Asumiendo un user_id de 1
            status: 'pending',
        };

        console.log('Bet Request:', betRequest);
        

        // try {
        //     const response = await axios.post('/api/requests', betRequest);
        //     console.log('Bet Request Response:', response.data);
        //     handleClose();
        // } catch (error) {
        //     console.error('Error creating bet request:', error);
        // }
    };

    const handleOddSelection = (odd) => {
        setSelectedOdd(odd);
    };

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
    );
};

export default BetModal;