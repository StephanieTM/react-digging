import React, { Component } from 'react';
import Cat from './Cat';
import Mouse from './Mouse';

export default class MouseTracker extends Component {
  render(): JSX.Element {
    return (
      <div>
        <h2>Render Props</h2>
        <h3>Move the mouse around!</h3>
        <Mouse
          render={mouse => (
            <Cat mouse={mouse} />
          )}
        />
      </div>
    );
  }
}
