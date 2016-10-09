import React from 'react';

export default function ComparedWeapon({ weapon }) {
  if (weapon) {
    return (
      <div>
        name: {weapon.name}<br />
      </div>
    );
  }
  return <div>?</div>;
}
