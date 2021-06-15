import React from 'react';
import Cat from './Cat';
import useMouse from './useMouse';

export default function MouseTracker(): JSX.Element {
  const [mouse, onMouseMove] = useMouse();

  return (
    <div>
      <h2>Hooks</h2>
      <h3>Move the mouse around!</h3>
      <div
        style={{
          height: '400px',
          border: '1px solid rgba(0, 0, 0, 0.6)',
          borderRadius: '5px',
        }}
        onMouseMove={onMouseMove}
      >
        <Cat mouse={mouse} />
      </div>
    </div>
  );
}
