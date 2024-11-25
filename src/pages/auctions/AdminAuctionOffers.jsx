import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminAuction.css';

const AdminAuctionProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/auctions/proposals`);
                setProposals(response.data.proposals || []);
            } catch (error) {
                console.error("Error fetching proposals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    const handleResponse = async (proposalId, type) => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/auctions/proposals/respond`, { 
                proposal_id: proposalId,
                type,
            });
            if (response.status === 200) {
                alert(`Proposal ${type} successfull!`);
                setProposals(proposals.filter((proposal) => proposal.proposal_id !== proposalId));
            }
        } catch (error) {
            console.error(`Error responding to proposal:`, error);
            alert(`Failed ${type} to the proposal.`);
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
