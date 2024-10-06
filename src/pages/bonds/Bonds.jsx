// bond.jsx

import React from 'react';
import RenderBond from '../../components/bonds/RenderBond';


const Bonds = () => {
  // Replace this with the actual way you retrieve the user ID
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <h1>Your Bonds</h1>
      <RenderBond userId={userId} />
    </div>
  );
};

export default Bonds;
