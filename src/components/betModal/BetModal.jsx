// PENDIENTE QUE SOLO ADMINS PUEDEN COMPRAR PARA LA EMPRESA

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
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isCompanyPurchase, setIsCompanyPurchase] = useState(false);
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('admin');

    if (!selectedCard) return null;

    const handleClose = () => {
        setSelectedCard(null);
        setSelectedAmount(1);
        setSelectedOdd(null);
        setSelectedTeam(null);
        setShowPaymentOptions(false); // Cerrar el modal de opciones de pago si está abierto
        setPaymentMethod(null);
        setIsCompanyPurchase(false);
    };

    const tryParseDate = (rawDate) => {
        // Intentamos varios formatos comunes
        const formats = [
            'MM/dd/yyyy, h:mm:ss a', // Formato usado en Mac
            'dd-MM-yyyy, h:mm:ss a', // Formato usado en Windows
            'dd/MM/yyyy, h:mm:ss',    // Otro formato posible
            'dd/MM/yyyy, HH:mm:ss'
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

    const handleBet = async (selectedWallet) => {

        const date = tryParseDate(selectedCard.date);
        const formattedDate = format(date, 'yyyy-MM-dd');

        if (!selectedWallet){
            selectedWallet = false;
        }

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
            wallet: selectedWallet, // Lo esta mandando null
            user_id: userId, 
            seller: isCompanyPurchase ? 15 : 0,
            status: 'pending',
        };


        if (selectedWallet) {
            if (betRequest.quantity * 1000 > balance) {
                alert('No tienes suficiente saldo');
                return;

            } else {
                try {
                    console.log(`\n Bet request wallet ${betRequest.wallet}\n`); // ESTA BIEN EN TRUE

                    const response = await axios.post(`${BACKEND_URL}/requests`, betRequest); // MANDA WALLET VACIO ??

                    console.log('Response:', response.data);
                    alert('Tu compra con wallet fue realizada con éxito');
                    setBalance(balance - betRequest.quantity * 1000);
                    handleClose();
                } catch (error) {
                    console.error('Error creating bet request:', error);
                }
            }

        } else {
            // Hacer la solicitud a Webpay si es la opción seleccionada
            try {
                const webpayResponse = await axios.post(`${BACKEND_URL}/requests`, betRequest);
                console.log('Webpay Response:', webpayResponse.data);

                // Redirigir al user_id a Webpay
                window.location.href = `${webpayResponse.data.url}?token_ws=${webpayResponse.data.token}`;
            } catch (error) {
                console.error('Error creating bet request or initiating Webpay:', error);
                alert('Hubo un problema al crear la request o al iniciar el pago con Webpay.');
            }
        }
    };

    const handleOddSelection = (odd, team_name) => {
        setSelectedOdd(odd);
        setSelectedTeam(team_name);
    };

    const handlePaymentSelection = (method) => {

        setPaymentMethod(method);
        setShowPaymentOptions(false); // Cerrar el modal de opciones de pago

        if (method == 'wallet') {
            handleBet(true); // Paga con wallet
        } else {
            handleBet(false); // Paga con Webpay
        }
    };
    
    const handleCompanyPurchase = () => {
        setIsCompanyPurchase(true); 
        setShowPaymentOptions(true);
    };

    const showPaymentModal = () => {
        setShowPaymentOptions(true); // Mostrar opciones de pago
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

                <button onClick={showPaymentModal}>Realizar Apuesta</button>
                {isAdmin == "true" && (
                    <button onClick={handleCompanyPurchase}>Comprar para la empresa</button>
                )}
                <button onClick={handleClose}>Cerrar</button>
            </div>

            {showPaymentOptions && (
                <div className="payment-modal">
                    <div className="payment-modal-content">
                        <h4>¿Cómo quieres pagar?</h4>
                        <button onClick={() => handlePaymentSelection('wallet')}>Wallet</button>
                        <button onClick={() => handlePaymentSelection('webpay')}>Webpay</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BetModal;