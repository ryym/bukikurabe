import React from 'react';

export default function SpecComparison({ weapon1, weapon2, shouldCompare }) {
  if (shouldCompare) {
    return (
      <div>
        {weapon1.name}: {`${weapon1.spec1}, ${weapon1.spec2}, ${weapon1.spec3}`}<br />
        {weapon2.name}: {`${weapon2.spec1}, ${weapon2.spec2}, ${weapon2.spec3}`}
      </div>
    );
  }
  return <div>-</div>;
}

