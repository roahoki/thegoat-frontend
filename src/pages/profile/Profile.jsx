import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [balance, setBalance] = useState(0); // State for the balance
    const [amount, setAmount] = useState(''); // State for the amount to load
    const [showInput, setShowInput] = useState(false); // State to show the input

    // URL of your API
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const API_URL = backendUrl; // Replace with the real URL of your API

    // Get sessionToken and userId from localStorage
    const sessionToken = localStorage.getItem('sessionToken');
    // const sessionToken = "test";
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        // Get the initial balance from the API
        const getBalance = async () => {
            try {
                console.log('userId:', userId);

                const response = await axios.get(`${API_URL}/users/wallet/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionToken}`,
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                     // Convertir la respuesta a JSON
                    setBalance(data.wallet); // Asegúrate de que 'balance' es el campo correcto
                    console.log(data.wallet, "FUNCIONANDO");
                } else {
                    console.error('Error getting the balance:', response.statusText);
                }
            } catch (error) {
                console.error('Error getting the balance:', error);
            }
        };

        getBalance();
    }, [sessionToken]);

    const handleLoadMoney = () => {
        setShowInput(true);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleAddMoney = async () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            try {
                const response = await axios.put(`${API_URL}/users/wallet`, {
                    amount: numericAmount,
                    user_id: userId
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionToken}`,
                        // You can add additional headers here if necessary
                    }
                });
                if (response.status === 200) {
                    console.log('Balance updated successfully:', response.data);
                    const data = response.data;
                    await setBalance(data.user.wallet); // Update the balance with the value returned by the API
                    console.log(data.user.wallet);
                    await setAmount('');
                    setShowInput(false);
                } else {
                    console.error('Error updating the balance:', response.statusText);
                }
            } catch (error) {
                console.error('Error making the request:', error);
            }
        }
    };

    return (
        isAuthenticated && (
            <div className='profile-container'>
                <div className='picture-container'>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>

                <div className='user-info-container'>
                    <div className='user-wallet-container'>
                        <h2>Balance: ${balance.toFixed(0)}</h2>
                        {showInput ? (
                            <div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="Enter the amount"
                                />
                                <button onClick={handleAddMoney}>Add</button>
                            </div>
                        ) : (
                            <button onClick={handleLoadMoney}>Load Money</button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;