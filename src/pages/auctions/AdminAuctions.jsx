import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminAuction.css';
import OfferModal from '../../components/OfferModal/OfferModal.jsx';

const AdminAuctions = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Obtener el userId (desde localStorage, contexto o JWT)
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchOffers = async () => {
            console.log("Fetching offers with userId:", userId); // Log para verificar
        
            if (!userId) {
                console.error("userId not found in localStorage.");
                alert("You need to log in as an admin to view offers.");
                return;
            }
        
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/auctions/offers`, {
                    params: { userId }, // Enviar el userId como query param
                });
                setOffers(response.data.offers || []);
            } catch (error) {
                console.error("Error fetching auction offers:", error);
                alert(error.response?.data?.error || "Failed to fetch auction offers.");
            } finally {
                setLoading(false);
            }
        };        

        fetchOffers();
    }, []);

    const handleOpenModal = (offer) => {
        setSelectedAuction(offer); // Abrir modal con la subasta seleccionada
    };

    const handleCloseModal = () => {
        setSelectedAuction(null); // Cerrar el modal
    };

    return (
        <div>
            <h1>Other Groups' Auction Offers</h1>
            {loading ? (
                <p>Loading offers...</p>
            ) : offers.length > 0 ? (
                offers.map((offer) => (
                    <div className="offer-card" key={offer.id}>
                        <h4>Fixture ID: {offer.fixture_id}</h4>
                        <p><strong>League:</strong> {offer.league_name}</p>
                        <p><strong>Round:</strong> {offer.round}</p>
                        <p><strong>Result:</strong> {offer.result}</p>
                        <p><strong>Quantity:</strong> {offer.quantity}</p>
                        <p><strong>Group ID:</strong> {offer.group_id}</p>
                        <p><strong>Auction ID:</strong> {offer.auction_id}</p>
                        <button onClick={() => handleOpenModal(offer)}>Lo quiero!</button>
                    </div>
                ))
            ) : (
                <p>No auction offers available.</p>
            )}
            {selectedAuction && (
                <OfferModal
                    offer={selectedAuction}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default AdminAuctions;

