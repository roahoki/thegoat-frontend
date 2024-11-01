import React, {useEffect, useState } from 'react';
import { FixturesProvider } from '../../contexts/FixturesContext';
import RenderRecommendedFixtures from '../../components/cards/RenderRecommendedFixtures'
import BetModal from '../../components/betModal/BetModal'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Recommendations = () => {
  const [data, setData] = useState(null);
  const [fixtures, setFixtures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heartbeatMessage, setHeartbeatMessage] = useState('');
  const [heartbeatStatus, setHeartbeatStatus] = useState('');

  const getHeartBeat = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/workers/heartbeat`);
      const result = await response.json();
      setHeartbeatMessage(result.message);
      if (result.message === 'doing good') {
        setHeartbeatStatus('good');
      } else {
        setHeartbeatStatus('bad');
      }
      console.log('Heartbeat: ', result.message);
    } catch (error) {
      console.error('Error fetching heartbeat:', error);
      setHeartbeatMessage('Error connecting to server');
      setHeartbeatStatus('bad');
    }
  };

  const getRecommendation = async () => {
    const user_id = localStorage.getItem('userId');
    try {
      const response = await fetch(`${BACKEND_URL}/workers/recommendation/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      const dataList = JSON.parse(result['result']);
      const fixtures = [];
      for (const [fixture_id, ponderacion] of dataList) {
        try {
          const fixtureResponse = await fetch(`${BACKEND_URL}/fixtures/data/${fixture_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const fixtureData = await fixtureResponse.json();
  
          // Add the fixture to the array
          fixtures.push({
            ...fixtureData,
            ponderacion,
          });
        } catch (error) {
          console.error(`Error fetching fixture data for ${fixture_id}:`, error);
        }
      }
  
      // Update the fixtures state
      setFixtures(fixtures);
      console.log('Array of fixtures:', fixtures);
  
      // Set loading to false after data is fetched
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Set loading to false even if there is an error
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getRecommendation();
  }, []);

  return (
    <FixturesProvider>
      <div>
         {/* Heartbeat Button and Message */}
         <button onClick={getHeartBeat}>Check Heartbeat</button>
        {heartbeatMessage && (
          <p style={{ color: heartbeatStatus === 'good' ? 'green' : 'red' }}>
            {heartbeatMessage}
          </p>
        )}

        {loading ? (
          <p>Recomendación en proceso</p>
        ) : (
          <RenderRecommendedFixtures recommendedFixtures={fixtures} />
        )}
        <BetModal />
      </div>
    </FixturesProvider>
  );

};

export default Recommendations;
