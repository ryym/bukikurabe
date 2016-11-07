import React from 'react';
import classNames from 'classnames';

export default function ComparedWeapon({ weapon, color }) {
  const content = weapon ? (
    <div>
      <img
        src={weapon.image}
        alt={weapon.name}
        className="compared-weapon-image"
      />
      <div className="compared-weapon-name">
        {weapon.name}
      </div>
      <dl>
        <dt>射程</dt>
        <dd>{weapon.spec1Value}</dd>
        <dt>攻撃力</dt>
        <dd>{weapon.spec2Value}</dd>
        <dt>連射力</dt>
        <dd>{weapon.spec3Value}</dd>
      </dl>
    </div>
  ) : (
    <span className="compared-weapon-empty">?</span>
  );

  return (
    <div
      className={classNames({
        'compared-weapon-wrapper': true,
        'is-not-set': ! weapon,
      })}
      style={{ backgroundColor: color }}
    >
      <div className="compared-weapon">
        {content}
      </div>
    </div>
  );
}
