import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminBonds.css'

const AdminBonds = () => {
    const [adminBonds, setAdminBonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchAdminBonds = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/bonds/avail`);
                setAdminBonds(response.data.adminBonds || []);
            } catch (error) {
                console.error('Error fetching admin available bonds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminBonds();
    }, []);

    const handleBuy = async (bondId, quantity, userId) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/admin/bonds/${bondId}/buy`, { quantity, userId });
            if (response.status === 200) {
                alert('Bond purchased successfully!');
            }

        } catch (error) {
            console.error('Error purchasing bond:', error);
            alert('Failed to purchase bond.');
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
                        <div key={bond.request_id} className="admin-bond-card">
                            <div className="admin-bond-details">
                                <h4>Request ID: {bond.request_id}</h4>
                                <p><strong>Fixture ID:</strong> {bond.fixture_id}</p>
                                <p><strong>League:</strong> {bond.league_name}</p>
                                <p><strong>Round:</strong> {bond.round}</p>
                                <p><strong>Date:</strong> {new Date(bond.date).toLocaleDateString()}</p>
                                <p><strong>Result:</strong> {bond.result}</p>
                                <p><strong>Quantity:</strong> {bond.quantity}</p>
                                <p><strong>Status:</strong> {bond.status}</p>
                                <p><strong>Payment Method:</strong> {bond.wallet ? 'Wallet' : 'Webpay'}</p>
                            </div>
                            <div className="admin-bond-actions">
                                <BuyBondForm bond={bond} onBuy={handleBuy} userId={userId} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No available admin bonds found.</p>
            )}
        </div>
    );
};

const BuyBondForm = ({ bond, onBuy, userId }) => {
    const [buyQuantity, setBuyQuantity] = useState(0);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setBuyQuantity(value > bond.quantity ? bond.quantity : value); // Limit to max available quantity
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (buyQuantity > 0 && buyQuantity <= bond.quantity) {
            onBuy(bond.request_id, buyQuantity, userId);
        } else {
            alert('Invalid quantity.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Quantity:
                <input
                    type="number"
                    min="1"
                    max={bond.quantity}
                    value={buyQuantity}
                    onChange={handleInputChange}
                    style={{ marginLeft: '10px', marginRight: '10px', width: '50px' }}
                />
            </label>
            <button type="submit">
                Buy
            </button>
        </form>
    );
};

export default AdminBonds;
