import React from 'react';
import './BondCard.css';

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
  wallet,
  ip_address,
  location,
  onDownloadReceipt // Callback para manejar la descarga de la boleta
}) => {
  // Función para verificar si debe mostrar el botón de descarga
  const shouldShowDownloadButton = () => {
    return wallet === false && (status === 'accepted' || status === 'won' || status === 'lost');
  };

  return (
    <div className="bond-card">
      <div className="bond-content">
        {/* Columna izquierda con el ID y detalles */}
        <div className="bond-left">
          <h4>Request ID: {request_id}</h4>
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
            <p><strong>Payment method:</strong> {wallet ? 'Wallet' : 'Webpay'}</p>
          </div>
        </div>

        {/* Columna derecha con el estado y el botón de descarga */}
        <div className="bond-right">
          <p>Status: {status}</p>
          {shouldShowDownloadButton() && (
            <button
              className="download-button"
              onClick={() => onDownloadReceipt(request_id, usuarioId, fixture_id, league_name, round, quantity)}
            >
              Descargar Boleta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BondCard;




