// VER BONOS QUE ESTAN EN SUBASTA

import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminAuction.css';
import OfferModal from '../../components/OfferModal/OfferModal.jsx';

const AdminAuctions = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/auctions/offers`);
                setOffers(response.data.offers || []);
            } catch (error) {
                console.error("Error fetching auction offers:", error);
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
                    <div className="offer-card">
                        <h4>Fixture ID: {offer.fixture_id}</h4>
                        <p><strong>League:</strong> {offer.league_name}</p>
                        <p><strong>Round:</strong> {offer.round}</p>
                        <p><strong>Result:</strong> {offer.result}</p>
                        <p><strong>Quantity:</strong> {offer.quantity}</p>
                        <p><strong>Group ID:</strong> {offer.group_id}</p>
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
