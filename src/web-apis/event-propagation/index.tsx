import React from 'react';
import { message } from 'antd';
import './index.less';

export default function Comp(): JSX.Element {
  function handleOuterClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, type: 'normal'|'stopPropagation'): void {
    if (type === 'stopPropagation') {
      e.stopPropagation();
    }
    console.log('outer clicked');
    message.info('outer clicked');
  }

  function handleInnerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, type: 'normal'|'stopPropagation'): void {
    if (type === 'stopPropagation') {
      e.stopPropagation();
    }
    console.log('inner clicked');
    message.info('inner clicked');
  }

  return (
    <div className="event-propagation">
      <h1>Event Propagation</h1>

      <div className="example-container">
        <h2>Both Normal</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'normal')}>
          <div className="inner-box" onClick={(e) => handleInnerClick(e, 'normal')}>
            Click Me
          </div>
        </div>
      </div>

      <div className="example-container">
        <h2>Outer Stop Propagation</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'stopPropagation')}>
          <div className="inner-box" onClick={(e) => handleInnerClick(e, 'normal')}>
            Click Me
          </div>
        </div>
      </div>

      <div className="example-container">
        <h2>Inner Stop Propagation</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'normal')}>
          <div className="inner-box" onClick={(e) => handleInnerClick(e, 'stopPropagation')}>
            Click Me
          </div>
        </div>
      </div>

      <div className="example-container">
        <h2>Both Stop Propagation</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'stopPropagation')}>
          <div className="inner-box" onClick={(e) => handleInnerClick(e, 'stopPropagation')}>
            Click Me
          </div>
        </div>
      </div>
    </div>
  );
}
