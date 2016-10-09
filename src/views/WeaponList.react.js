import React from 'react';

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
      {weapon.name} - {weapon.description}
    </li>
  );

  return (
    <ul>
      {weapons.map(renderWeapon)}
    </ul>
  );
}
