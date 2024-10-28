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
    try {
      const response = await fetch(`${BACKEND_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: 4,
        }),
      });
      const result = await response.json();
      setData(result);
      console.log('Suma: ', result.result);
    } catch (error) {
      console.error('Error al hacer el POST:', error);
    }
  }

  return (
    <FixturesProvider>
      <div>
        <button
          onClick={getHeartBeat}
        >HEARTBEAT</button>

        <button
          onClick={getSum}
        >
          SUMAR 4
        </button>

        
      </div>
    </FixturesProvider>
    )
}

export default Recommendations
