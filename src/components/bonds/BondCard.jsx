// BondCard.jsx

import React from 'react';
import './BondCard.css'; // You can create a CSS file for styling

const BondCard = ({
  request_id,
  group_id,
  fixture_id,
  league_name,
  round,
  date,
  result,
  deposit_token,
  datetime,
  quantity,
  seller,
  usuarioId,
  status,
  ip_address,
  location,
}) => {
  return (
    <div className="bond-card">
      <div className="bond-header">
        <h4>Request ID: {request_id}</h4>
        <p>Status: {status}</p>
      </div>
      <div className="bond-details">
        <p><strong>Group ID:</strong> {group_id}</p>
        <p><strong>Fixture ID:</strong> {fixture_id}</p>
        <p><strong>League:</strong> {league_name}</p>
        <p><strong>Round:</strong> {round}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleString()}</p>
        <p><strong>Result:</strong> {result}</p>
        <p><strong>Deposit Token:</strong> {deposit_token}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Seller:</strong> {seller}</p>
        <p><strong>User ID:</strong> {usuarioId}</p>
        <p><strong>IP Address:</strong> {ip_address}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>
    </div>
  );
};

export default BondCard;
