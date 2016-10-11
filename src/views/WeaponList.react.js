import React from 'react';

function WeaponItem({ imageUrl, name }) {
  return (
    <div className="weapon-item">
      <img
        className="weapon-item-image"
        src={imageUrl}
        alt={name}
      />
      <div className="weapon-item-name">
        {name}
      </div>
    </div>
  );
}

export default function WeaponList({
  weapons,
  onMouseEnter,
  onMouseLeave,
  onClick
}) {
  const renderWeapon = weapon => (
    <li
      key={weapon.id}
      onMouseEnter={() => onMouseEnter(weapon.id)}
      onMouseLeave={() => onMouseLeave(weapon.id)}
      onClick={() => onClick(weapon.id)}
    >
      <WeaponItem
        imageUrl={weapon.image}
        name={weapon.name}
      />
    </li>
  );

  return (
    <ul className="weapon-list">
      {weapons.map(renderWeapon)}
    </ul>
  );
}
