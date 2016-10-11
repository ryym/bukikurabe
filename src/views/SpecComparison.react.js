import React from 'react';

function SpecItem({ name, aSpec, bSpec }) {
  return (
    <div className="spec-comparison-item">
      <div className="spec-comparison-item-name">
        {name}
      </div>
      <div className="spec-comparison-bars">
        <div
          className="spec-comparison-bar spec-comparison-bar-a"
          style={{ width: `${aSpec}%` }}
        />
        <div
          className="spec-comparison-bar spec-comparison-bar-b"
          style={{ width: `${bSpec}%` }}
        />
      </div>
    </div>
  );
}

export default function SpecComparison({
  weapon1,
  weapon2,
  shouldCompare,
  onClose
}) {
  if (shouldCompare) {
    return (
      <div className="spec-comparison">
        <button className="spec-comparison-close" onClick={onClose}>x</button>
        <SpecItem name="射程" aSpec={weapon1.spec1} bSpec={weapon2.spec1} />
        <SpecItem name="攻撃力" aSpec={weapon1.spec2} bSpec={weapon2.spec2} />
        <SpecItem name="連射力" aSpec={weapon1.spec3} bSpec={weapon2.spec3} />
      </div>
    );
  }
  return <div className="spec-comparison is-hidden" />;
}

