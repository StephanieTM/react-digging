import React from 'react';
import { IMouse } from '../interface';

export default function Cat(props: { mouse: IMouse }): JSX.Element {
  const { mouse } = props;

  return (
    <img
      src="/assets/images/cat.png"
      style={{
        position: 'absolute',
        left: mouse.x,
        top: mouse.y,
        width: '20px',
        height: '20px',
      }}
    />
  );
}
