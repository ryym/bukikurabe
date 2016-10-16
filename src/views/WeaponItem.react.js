import React from 'react';

export default function WeaponItem({ imageUrl, name }) {
  return (
    <div className="weapon-item-wrapper">
      <div className="weapon-item">
        <img
          className="weapon-item-image"
          src={imageUrl}
          alt={name}
        />
        <div className="weapon-item-name">
          {name}
        </div>
        <div className="weapon-item-type">
          シューター
        </div>
        <div>
          <span className="weapon-item-sub">
            スプラッシュボム
          </span>
          /
          <span className="weapon-item-special">
            バリア
          </span>
        </div>
      </div>
    </div>
  );
}

