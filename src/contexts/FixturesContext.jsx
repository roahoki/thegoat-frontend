import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// Crear el contexto
export const FixturesContext = createContext()

// Proveedor del contexto
export const FixturesProvider = ({ children }) => {
    const [selectedLeague, setSelectedLeague] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)
    const [loading, setLoading] = useState(true);
    const [fixturesData, setFixtures] = useState([]);
    const [balance, setBalance] = useState(null);

    const getBalance = async () => {
        try {
            const sessionToken = localStorage.getItem('sessionToken');
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BACKEND_URL}/users/wallet/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`,
                },
            });

            if (response.status === 200) {
                const data = response.data;
                console.log(data.wallet, "wallet");
                setBalance(data.wallet);

            } else {
                console.error('Error getting the balance:', response.statusText);
            }
        } catch (error) {
            console.error('Error getting the balance:', error);
        }
    }


    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/fixtures/data`);
                // console.log(response.data);
                setFixtures(response.data);
                setLoading(false); // Se detiene el estado de carga
            } catch (error) {
                console.error('Error fetching features:', error);
                setLoading(false);
            }
        };


        fetchFixtures();
        getBalance();
    }, []);


    useEffect(() => {
        const handleFocus = () => {
            getBalance();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);


    if (loading) {
        return <div>Cargando...</div>; 
    }


    return (
        <FixturesContext.Provider value={{ selectedLeague, setSelectedLeague, selectedDate, setSelectedDate, selectedCard, setSelectedCard, fixturesData, balance, setBalance }}>
            {children}
        </FixturesContext.Provider>
    )
}