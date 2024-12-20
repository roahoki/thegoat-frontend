import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfferModal.css'; // Archivo de estilos para el modal

const OfferModal = ({ offer, onClose }) => {
    const [adminBonds, setAdminBonds] = useState([]);
    const [selectedBond, setSelectedBond] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    console.log('userId from localStorage:', localStorage.getItem('userId'));

    useEffect(() => {
        const fetchAdminBonds = async () => {
            const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
    
            if (!userId) {
                console.error('No userId found in localStorage.');
                alert('You need to log in as an admin to view bonds.');
                return;
            }
    
            console.log('Sending userId:', userId); // Verificar qué se está enviando
    
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/bonds`, {
                    params: { userId }, // Enviar el userId como query parameter
                });
                console.log('Fetched bonds:', response.data); // Verificar la respuesta
                setAdminBonds(response.data.adminBonds || []);
            } catch (error) {
                console.error('Error fetching admin bonds:', error);
                alert(error.response?.data?.error || 'Failed to fetch admin bonds.');
            }
        };
    
        fetchAdminBonds();
    }, []);
    
    

    const handleOffer = async () => {
        if (!selectedBond) {
            alert('Please select a bond to offer.');
            return;
        }

        try {

            const response = await axios.post(`${BACKEND_URL}/auctions/${offer.auction_id}/offer`, {
                userId: localStorage.getItem('userId'),
                bondId: selectedBond.request_id,
                fixture_id: selectedBond.fixture_id,
                league_name: selectedBond.league_name,
                round: selectedBond.round,
                result: selectedBond.result,
                quantity: selectedBond.quantity,
                request_id: selectedBond.request_id
            });

            if (response.status === 200) {
                alert('Offer made successfully!');
                onClose(); // Cerrar el modal después de hacer la oferta
            }
        } catch (error) {
            console.error('Error making an offer:', error);
            alert('Failed to make an offer.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Make an Offer for Auction ID: {offer.auction_id}</h2>
                <p>Fixture: {offer.league_name} - {offer.round}</p>
                <p>Result: {offer.result}</p>
                <p>Quantity: {offer.quantity}</p>

                <h2>Your Bonds</h2>
                {adminBonds.length > 0 ? (
                    <ul>
                        {adminBonds.map((bond) => (
                            <li key={bond.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name="bond"
                                        value={bond.id}
                                        onChange={() => setSelectedBond(bond)}
                                    />
                                    {bond.league_name} - {bond.round} - {bond.result} (Quantity: {bond.quantity})
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bonds available to offer.</p>
                )}
                <button onClick={handleOffer} disabled={!selectedBond}>
                    Make Offer
                </button>
            </div>
        </div>
    );
};

export default OfferModal;
