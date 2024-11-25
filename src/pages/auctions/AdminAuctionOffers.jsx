import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminAuction.css';

const AdminAuctionProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchProposals = async () => {
            const userId = localStorage.getItem("userId"); // Obtener el userId desde localStorage
            console.log("Fetching proposals for userId:", userId); // Log para depuración
    
            if (!userId) {
                console.error("userId not found in localStorage.");
                alert("You need to log in as an admin to view proposals.");
                return;
            }
    
            try {
                const response = await axios.get(`${BACKEND_URL}/auctions/proposals`, {
                    params: { userId }, // Enviamos el userId como query param
                });
                setProposals(response.data.proposals || []);
            } catch (error) {
                console.error("Error fetching proposals:", error);
                alert(error.response?.data?.error || "Failed to fetch proposals.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchProposals();
    }, []);
    

    const handleResponse = async (proposalId, type) => {
        const userId = localStorage.getItem("userId"); // Obtener el userId desde localStorage
    
        if (!userId) {
            alert("You need to log in as an admin to perform this action.");
            return;
        }
    
        try {
            const response = await axios.patch(
                `${BACKEND_URL}/auctions/proposals/respond`,
                { proposal_id: proposalId, type }, // Datos en el body
                { params: { userId } } // userId como query param
            );
    
            if (response.status === 200) {
                alert(`Proposal ${type} successfully!`);
                setProposals(proposals.filter((proposal) => proposal.proposal_id !== proposalId));
            }
        } catch (error) {
            console.error(`Error responding to proposal:`, error);
            alert(`Failed to ${type} the proposal.`);
        }
    };
    

    return (
        <div>
            <h1>Proposals for Your Auctions</h1>
            {loading ? (
                <p>Loading proposals...</p>
            ) : proposals.length > 0 ? (
                proposals.map((proposal) => (
                    <div key={proposal.proposal_id} className="offer-card">
                        <h4>Proposal ID: {proposal.proposal_id}</h4>
                        <p><strong>Offered Fixture:</strong> {proposal.league_name} - {proposal.round}</p>
                        <p><strong>Result:</strong> {proposal.result}</p>
                        <p><strong>Quantity:</strong> {proposal.quantity}</p>
                        <p><strong>Group ID:</strong> {proposal.group_id}</p>
                        <div className="proposal-actions">
                            <button onClick={() => handleResponse(proposal.proposal_id, "acceptance")}>Accept</button>
                            <button onClick={() => handleResponse(proposal.proposal_id, "rejection")}>Reject</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No proposals available.</p>
            )}
        </div>
    );
};

export default AdminAuctionProposals;
