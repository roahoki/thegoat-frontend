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
            console.log("Fetching offers for userId:", userId); // Log para depurar
    
            if (!userId) {
                console.error("userId not found in localStorage.");
                alert("You need to log in to view your offers.");
                return;
            }
    
            try {
                const response = await axios.get(`${BACKEND_URL}/auctions/my-offers`, {
                    params: { userId }, // Enviamos el userId como query param
                });
                setOffers(response.data.offers || []);
            } catch (error) {
                console.error("Error fetching user offers:", error);
                alert("Failed to fetch user offers.");
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
