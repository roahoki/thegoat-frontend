// bond.jsx

import React from 'react';
import RenderBond from './RenderBond';

const BondPage = () => {
  // Replace this with the actual way you retrieve the user ID
  const userId = useLocalStorage.getItem('userId');

  return (
    <div>
      <h1>Your Bonds</h1>
      <RenderBond userId={userId} />
    </div>
  );
};

export default BondPage;
