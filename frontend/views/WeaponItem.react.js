import React from 'react';

export default function WeaponItem({ weapon }) {
  return (
    <div className="weapon-item-wrapper">
      <div className="weapon-item">
        <img
          className="weapon-item-image"
          src={weapon.image}
          alt={weapon.name}
        />
        <div className="weapon-item-name">
          {weapon.name}
        </div>
        <div className="weapon-item-type">
          {weapon.weaponType.name}
        </div>
        <div>
          <span className="weapon-item-sub">
            {weapon.subWeapon.name}
          </span>
          /
          <span className="weapon-item-special">
            {weapon.specialWeapon.name}
          </span>
        </div>
      </div>
    </div>
  );
}

