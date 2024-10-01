import React, { useState } from 'react';
import './Home.css';
import Hero from '../../components/hero/Hero';

function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://1mvu1q04jf.execute-api.us-east-2.amazonaws.com/TEST/fixtures/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      <Hero />
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default Home;