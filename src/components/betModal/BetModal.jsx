import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FixturesContext } from '../../contexts/FixturesContext';
import './BetModal.css';
import { parse, format } from 'date-fns';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const BetModal = () => {
    const { selectedCard, setSelectedCard, balance, setBalance } = useContext(FixturesContext);

    const [selectedOdd, setSelectedOdd] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const userId = localStorage.getItem('userId');
    if (!selectedCard) return null;

    const handleClose = () => {
        setSelectedCard(null);
        setSelectedAmount(1);
        setSelectedOdd(null);
        setSelectedTeam(null);
    };
    const tryParseDate = (rawDate) => {
        // Intentamos varios formatos comunes
        const formats = [
            'MM/dd/yyyy, h:mm:ss a', // Formato usado en Mac
            'dd-MM-yyyy, h:mm:ss a', // Formato usado en Windows
            'dd/MM/yyyy, h:mm:ss'    // Otro formato posible
        ];
    
        let parsedDate = null;
    
        for (const fmt of formats) {
            try {
                parsedDate = parse(rawDate, fmt, new Date());
                if (!isNaN(parsedDate)) break; // Si es válida, rompemos el ciclo
            } catch (error) {
                console.warn(`Formato fallido: ${fmt}`);
            }
        }
    
        if (!parsedDate || isNaN(parsedDate)) {
            throw new Error('No se pudo interpretar la fecha');
        }
    
        return parsedDate;
    };

    const handleBet = async () => {
        const date = tryParseDate(selectedCard.date);
        const formattedDate = format(date, 'yyyy-MM-dd');
        console.log('Formatted Date:', formattedDate);

        const betRequest = {
            group_id: '15', // Asumiendo que el group_id es 15
            fixture_id: selectedCard.fixture_id,
            league_name: selectedCard.league_name,
            round: selectedCard.round,
            date: formattedDate,
            result: selectedTeam,
            deposit_token: "", // Asumiendo que no hay token de depósito
            datetime: new Date().toISOString(),
            quantity: parseInt(selectedAmount, 10),
            usuarioId: userId, 
            status: 'pending',
        };

        console.log('Bet Request:', betRequest);

        if (betRequest.quantity * 1000 > balance) {
            console.log('No tienes suficiente saldo');
            return;
        } else {
            try {
                const response = await axios.post(`${BACKEND_URL}/requests`, betRequest);
                console.log('Bet Request Response:', response.data);
                handleClose();
            } catch (error) {
                console.error('Error creating bet request:', error);
            }
        }
    };

    const handleOddSelection = (odd, team_name) => {
        setSelectedOdd(odd);
        setSelectedTeam(team_name);
    };

    return (
        <div className="bet-modal">
            <div className="bet-modal-content">
                <h3>{selectedCard.home} vs {selectedCard.away}</h3>
                <p>{selectedCard.available_bonds} bonos disponibles</p>

                <div className='odds-options'>
                    <div
                        className={selectedOdd === selectedCard.odd_home ? 'selected' : ''}
                        onClick={() => handleOddSelection(selectedCard.odd_home, selectedCard.home)}
                    >
                        <h5>{selectedCard.home}</h5>
                        <p>{selectedCard.odd_home}</p>
                    </div>

                    <div
                        className={selectedOdd === selectedCard.odd_visit ? 'selected' : ''}
                        onClick={() => handleOddSelection(selectedCard.odd_visit, selectedCard.away)}
                    >
                        <h5>{selectedCard.away}</h5>
                        <p>{selectedCard.odd_visit}</p>
                    </div>

                    <div
                        className={selectedOdd === selectedCard.odd_draw ? 'selected' : ''}
                        onClick={() => handleOddSelection(selectedCard.odd_draw, "---")}
                    >
                        <h5>Empate</h5>
                        <p>{selectedCard.odd_draw}</p>
                    </div>
                </div>

                <div className='user-bet-options'>
                    <div>
                        <p>Saldo ${balance}</p>
                        <p>Costo por Bono $1000</p>
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