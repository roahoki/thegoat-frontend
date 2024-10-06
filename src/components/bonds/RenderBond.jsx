// RenderBond.jsx

import React, { useState, useEffect } from 'react';
import BondCard from './BondCard';
import axios from 'axios';

const RenderBond = ({ userId }) => {
  const [bondsData, setBondsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL  
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBonds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/users/${userId}/requests`);
      const data = response.data;
      if (data.requests) {
        setBondsData(data.requests);
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
          <BondCard key={index} {...bond} />
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
