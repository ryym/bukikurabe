import React from 'react';

export default function ComparedWeapon({ weapon }) {
  if (weapon) {
    return (
      <div className="compared-weapon">
        <img src={weapon.image} alt={weapon.name} />
        {weapon.name}
      </div>
    );
  }
  return <div className="compared-weapon">?</div>;
}
