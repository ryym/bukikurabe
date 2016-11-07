import React from 'react';
import WeaponItem from './WeaponItem';

export default function WeaponList({
  weapons,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const renderWeapon = weapon => (
    <li
      key={weapon.id}
      onMouseEnter={() => onMouseEnter(weapon.id)}
      onMouseLeave={() => onMouseLeave(weapon.id)}
      onClick={() => onClick(weapon.id)}
    >
      <WeaponItem weapon={weapon} />
    </li>
  );

  return (
    <ul className="weapon-list">
      {weapons.map(renderWeapon)}
    </ul>
  );
}
