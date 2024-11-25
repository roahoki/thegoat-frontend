// Ver el estado de las propuestas del usuario

import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminAuction.css';

const AdminProposals = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchUserOffers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/auctions/my-offers`, {
                    params: { userId },
                });
                setOffers(response.data.offers || []);
            } catch (error) {
                console.error("Error fetching user offers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOffers();
    }, []);

    return (
        <div>
            <h1>My Offers</h1>
            {loading ? (
                <p>Loading offers...</p>
            ) : offers.length > 0 ? (
                <div>
                    {offers.map((offer) => (
                        <div key={offer.proposal_id} className="offer-card">
                            <h4>Proposal ID: {offer.proposal_id}</h4>
                            <p><strong>Auction ID:</strong> {offer.auction_id}</p>
                            <p><strong>Fixture:</strong> {offer.league_name} - {offer.round}</p>
                            <p><strong>Result:</strong> {offer.result}</p>
                            <p><strong>Quantity:</strong> {offer.quantity}</p>
                            <p><strong>Status:</strong> {offer.type || "Pending"}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No offers made.</p>
            )}
        </div>
    );
};

export default AdminProposals;
