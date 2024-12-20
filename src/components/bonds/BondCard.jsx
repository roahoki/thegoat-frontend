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
  user_id,
  status,
  wallet,
  ip_address,
  location,
  user,
  home_team_name,
  away_team_name,
  onDownloadReceipt // Callback para manejar la descarga de la boleta
}) => {
  // Función para verificar si debe mostrar el botón de descarga
  const shouldShowDownloadButton = () => {
    return status === 'accepted' || status === 'won' || status === 'lost';
  };

  return (
    <div className="bond-card">
      <div className="bond-content">
        {/* Columna izquierda con el ID y detalles */}
        <div className="bond-left">
          <h4>Request ID: {request_id}</h4>
          <div className="bond-details">
            {group_id && <p><strong>Group ID:</strong> {group_id}</p>}
            {fixture_id && <p><strong>Fixture ID:</strong> {fixture_id}</p>}
            {league_name && <p><strong>League:</strong> {league_name}</p>}
            {round && <p><strong>Round:</strong> {round}</p>}
            {date && <p><strong>Date:</strong> {new Date(date).toLocaleString()}</p>}
            {result && <p><strong>Result:</strong> {result}</p>}
            {deposit_token && <p><strong>Deposit Token:</strong> {deposit_token}</p>}
            {quantity && <p><strong>Quantity:</strong> {quantity}</p>}
            {seller !== undefined && <p><strong>Seller:</strong> {seller}</p>}
            {user_id && <p><strong>User ID:</strong> {user_id}</p>}
            {ip_address && <p><strong>IP Address:</strong> {ip_address}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
            <p><strong>Payment method:</strong> {wallet ? 'Wallet' : 'Webpay'}</p>
          </div>
        </div>

        {/* Columna derecha con el estado y el botón de descarga */}
        <div className="bond-right">
          <p><strong>Status:</strong> {status}</p>
          {shouldShowDownloadButton() && (
            <button
              className="download-button"
              onClick={() => onDownloadReceipt(request_id, user_id, fixture_id, league_name, round, quantity, user.name, user.email, home_team_name, away_team_name)}
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
