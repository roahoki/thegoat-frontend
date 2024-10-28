import React, { useState, useEffect } from 'react';
import BondCard from './BondCard';
import axios from 'axios';

const RenderBond = ({ userId }) => {
  const [bondsData, setBondsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL  
  const [loading, setLoading] = useState(true);

  async function handleDownloadReceipt(request_id, user_id, fixture_id, league_name, round, quantity, name, email, home_team_name, away_team_name) {
    try {
      const response = await axios.post(`https://1mvu1q04jf.execute-api.us-east-2.amazonaws.com/dev/receipts/${request_id}`, {
        request_id: request_id,
        user_id: user_id,
        fixture_id: fixture_id,
        league_name: league_name,
        round: round,
        quantity: quantity,
        name: name, 
        email: email,
        home_team_name: home_team_name, 
        away_team_name: away_team_name
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const data = response.data;
      if (response.status === 200) {
        console.log("Boleta generada exitosamente:", data.pdfUrl);
        window.open(data.pdfUrl, "_blank"); 
      } else {
        console.error("Error al generar la boleta:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de generación de boleta:", error);
    }
  }

  useEffect(() => {
    const fetchBonds = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/users/${userId}/requests`);
        const data = response.data;

        if (data.requestsWithTeamData) {
          setBondsData(data.requestsWithTeamData);
        } else {
          setBondsData([]);
        }
      } catch (error) {
        console.error('Error fetching bonds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBonds();
  }, [userId]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div>
      {loading ? (
        <p>Loading bonds...</p>
      ) : bondsData.length > 0 ? (
        bondsData.slice(0, visibleCount).map((bond, index) => (
          <BondCard
            key={index}
            {...bond}
            onDownloadReceipt={handleDownloadReceipt} // Pasar la función de descarga a cada BondCard
          />
        ))
      ) : (
        <p>No bonds available for this user.</p>
      )}
      {!loading && visibleCount < bondsData.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default RenderBond;

