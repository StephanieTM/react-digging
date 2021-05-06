import React, { Component } from 'react';
import { IMouse } from '../interface';

interface IProps {
  render: (mouse: IMouse) => JSX.Element;
}

export default class ICat extends Component<IProps, IMouse> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render(): JSX.Element {
    return (
      <div
        style={{
          height: '400px',
          border: '1px solid rgba(0, 0, 0, 0.6)',
          borderRadius: '5px',
          margin: '20px',
        }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
      </div>
    );
  }
}
