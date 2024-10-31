import React, {useState} from 'react'
import { FixturesProvider } from '../../contexts/FixturesContext'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const Recommendations = () => {
  
  const [data, setData] = useState(null)



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

  const getSum = async () => {
    const user_id = localStorage.getItem('userId');
    try {
      const response = await fetch(`${BACKEND_URL}/workers/sum/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setData(result);
      console.log('Suma: ', result.result);
    } catch (error) {
      console.error('Error al hacer el GET:', error);
    }
  }

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
      setData(result);
      console.log('Resultado recommendation: ', result.result);
    } catch (error) {
      console.error('Error al hacer el GET:', error);
    }
  }



  return (
    <FixturesProvider>
      <div>
        <button
          onClick={getHeartBeat}
        >HEARTBEAT</button>

        <button
          onClick={getRecommendation}
        >
          get Recommendation
        </button>

        
      </div>
    </FixturesProvider>
    )
}

export default Recommendations
