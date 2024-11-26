import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBonds = () => {
    const [adminBonds, setAdminBonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Aquí se obtiene el userId (puede ser desde un contexto, JWT, o localStorage)
    const userId = localStorage.getItem('userId'); // Asegúrate de guardar el userId al iniciar sesión

    useEffect(() => {
        const fetchAdminBonds = async () => {
            const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage
            console.log('User ID (fetchAdminBonds):', userId);
            
            if (!userId) {
                alert('You need to log in as an admin to view bonds.');
                return;
            }
    
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/bonds`, {
                    params: { userId }, // Enviar el userId como query parameter
                });
                setAdminBonds(response.data.adminBonds || []);
            } catch (error) {
                console.error('Error fetching admin bonds:', error);
                alert(error.response?.data?.error || 'Failed to fetch admin bonds.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchAdminBonds();
    }, []);
    

    const handleMakeAvailable = async (bondId) => {
        const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage
    
        if (!userId) {
            alert('You need to log in as an admin to perform this action.');
            return;
        }
    
        try {
            const response = await axios.patch(
                `${BACKEND_URL}/admin/bonds/${bondId}/avail`,
                null, // No body en el PATCH
                { params: { userId } } // Enviar el userId como query parameter
            );
    
            if (response.status === 200) {
                alert('Bond made available successfully!');
            }
        } catch (error) {
            console.error('Error making bond available:', error);
            alert(error.response?.data?.error || 'Failed to make bond available.');
        }
    };
    

    const handlePutOnAuction = async (bondId) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auctions/${bondId}`, {
                userId, // Envía el userId al backend
            });
            if (response.status === 200) {
                alert('Bond put on auction successfully!');
            }
        } catch (error) {
            console.error('Error putting bond on auction:', error);
            alert(error.response?.data?.error || 'Failed to put bond on auction.');
        }
    };

    return (
        <div>
            <h1>Admin Bonds</h1>
            {loading ? (
                <p>Loading bonds...</p>
            ) : adminBonds.length > 0 ? (
                <div>
                    {adminBonds.map((bond) => (
                        <div key={bond.id} className="bond-card">
                            <h4>Request ID: {bond.request_id}</h4>
                            <p><strong>Fixture ID:</strong> {bond.fixture_id}</p>
                            <p><strong>League:</strong> {bond.league_name}</p>
                            <p><strong>Round:</strong> {bond.round}</p>
                            <p><strong>Date:</strong> {new Date(bond.date).toLocaleDateString()}</p>
                            <p><strong>Result:</strong> {bond.result}</p>
                            <p><strong>Quantity:</strong> {bond.quantity}</p>
                            <p><strong>Status:</strong> {bond.status}</p>
                            <p><strong>Payment Method:</strong> {bond.wallet ? 'Wallet' : 'Webpay'}</p>
                            <button
                                onClick={() => handleMakeAvailable(bond.request_id)}
                                disabled={bond.status === 'available'}
                            >
                                {bond.status === 'available' ? 'Available' : 'Make Available'}
                            </button>
                            <button
                                onClick={() => handlePutOnAuction(bond.request_id)}
                                disabled={bond.status === 'on auction'}
                                style={{ marginLeft: '10px' }}
                            >
                                {bond.status === 'on auction' ? 'On Auction' : 'Put on Auction'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No admin bonds found.</p>
            )}
        </div>
    );
};

export default AdminBonds;

