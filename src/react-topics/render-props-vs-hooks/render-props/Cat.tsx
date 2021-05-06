import React, { Component } from 'react';
import { IMouse } from '../interface';

export default class Cat extends Component<{ mouse: IMouse }> {
  render(): JSX.Element {
    const mouse = this.props.mouse;

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
}
