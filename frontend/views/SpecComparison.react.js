import React from 'react';

function SpecItem({ name, aSpec, bSpec, colors }) {
  return (
    <div className="spec-comparison-item">
      <div className="spec-comparison-item-name">
        {name}
      </div>
      <div className="spec-comparison-bars">
        <div
          className="spec-comparison-bar spec-comparison-bar-a"
          style={{ width: `${aSpec}%`, backgroundColor: colors[0] }}
        />
        <div
          className="spec-comparison-bar spec-comparison-bar-b"
          style={{ width: `${bSpec}%`, backgroundColor: colors[1] }}
        />
      </div>
    </div>
  );
}

export default function SpecComparison({
  weapon1,
  weapon2,
  colors,
  shouldCompare,
  onClose,
}) {
  if (shouldCompare) {
    return (
      <div className="spec-comparison">
        <button className="spec-comparison-close" onClick={onClose}>x</button>
        <SpecItem
          name="射程"
          aSpec={weapon1.spec1Value}
          bSpec={weapon2.spec1Value}
          colors={colors}
        />
        <SpecItem
          name="攻撃力"
          aSpec={weapon1.spec2Value}
          bSpec={weapon2.spec2Value}
          colors={colors}
        />
        <SpecItem
          name="連射力"
          aSpec={weapon1.spec3Value}
          bSpec={weapon2.spec3Value}
          colors={colors}
        />
      </div>
    );
  }
  return <div className="spec-comparison is-hidden" />;
}

