import React, {useEffect, useState } from 'react';
import { FixturesProvider } from '../../contexts/FixturesContext';
import RenderRecommendedFixtures from '../../components/cards/RenderRecommendedFixtures'
import BetModal from '../../components/betModal/BetModal'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Recommendations = () => {
  const [data, setData] = useState(null);
  const [fixtures, setFixtures] = useState(null);



  const getHeartBeat = async () => {
    try {
      const response = await fetch(`http://localhost:3000/workers/heartbeat`);
      const result = await response.json();
      setData(result);
      console.log('Heartbeat: ', result.message);
    } catch (error) {
      console.error('Error al hacer el GET:', error);
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

          // Agregar el fixture al array
          fixtures.push({
            ...fixtureData,
            ponderacion, // Agregar ponderación al objeto de fixture
          });
        } catch (error) {
          console.error(`Error al obtener datos del fixture ${fixture_id}:`, error);
        }
      }

      // Imprimir el array completo en la consola
      console.log('Array de fixtures:', fixtures);

      // Guardar el array en el estado si lo necesitas
      setData(fixtures);
    } catch (error) {
      console.error('Error al hacer el GET:', error);
    }
  };


  useEffect(() => {
    const fetchRecommendations = async () => {
      await getRecommendation();
    };

    fetchRecommendations();
  }, []);

  return (
    <FixturesProvider>
      <div>
        <button onClick={getRecommendation}>
          get Recommendation
        </button>
      </div>

      <div>
        {fixtures ? (
          <RenderRecommendedFixtures recommendedFixtures={fixtures} />
        ) : (
          <p>Recomendación en proceso</p>
        )}
        <BetModal />
      </div> 
    </FixturesProvider>
  );


};

export default Recommendations;
