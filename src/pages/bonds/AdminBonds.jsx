import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBonds = () => {
    const [adminBonds, setAdminBonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchAdminBonds = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/bonds`);
                setAdminBonds(response.data.adminBonds || []);
            } catch (error) {
                console.error('Error fetching admin bonds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminBonds();
    }, []);

    const handleMakeAvailable = async (bondId) => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/admin/bonds/${bondId}/avail`);
            if (response.status === 200) {
                alert('Bond made available successfully!');
                setAdminBonds((prevBonds) =>
                    prevBonds.map((bond) =>
                        bond.id === bondId ? { ...bond, status: 'available' } : bond
                    )
                );
            }
        } catch (error) {
            console.error('Error making bond available:', error);
            alert('Failed to make bond available.');
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
