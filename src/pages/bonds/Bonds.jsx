// bond.jsx

import React from 'react';
import RenderBond from '../../components/bonds/RenderBond';


const Bonds = () => {
  const userId = localStorage.getItem('userId');
  console.log(userId);
  return (
    <div>
      <h1>Your Bonds</h1>
      <RenderBond userId={userId} />
    </div>
  );
};

export default Bonds;
