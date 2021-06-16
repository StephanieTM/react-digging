import React, { useCallback, useEffect } from 'react';
import { message } from 'antd';
import './index.less';

export default function Comp(): JSX.Element {
  const handleClick = useCallback((event: MouseEvent, element: string, useCapture: boolean, type: 'normal'|'stopPropagation'): void => {
    if (type === 'stopPropagation') {
      event.stopPropagation();
    }
    const eventPhase = useCapture ? 'event capture' : 'event bubbling';
    const msg = `${element} @ ${eventPhase}`;
    console.log(msg);
    message.info(msg);
  }, []);

  useEffect(() => {
    document.addEventListener('click', (e) => handleClick(e, 'document', false, 'normal'), false);
    document.addEventListener('click', (e) => handleClick(e, 'document', true, 'normal'), true);
  }, [handleClick]);

  useEffect(() => {
    // Capture And Bubbling
    document.getElementById('outer-box-1')?.addEventListener('click', (e) => handleClick(e, 'outer-box-1', false, 'normal'), false);
    document.getElementById('middle-box-1')?.addEventListener('click', (e) => handleClick(e, 'middle-box-1', false, 'normal'), false);
    document.getElementById('inner-box-1')?.addEventListener('click', (e) => handleClick(e, 'inner-box-1', false, 'normal'), false);
    document.getElementById('outer-box-1')?.addEventListener('click', (e) => handleClick(e, 'outer-box-1', true, 'normal'), true);
    document.getElementById('middle-box-1')?.addEventListener('click', (e) => handleClick(e, 'middle-box-1', true, 'normal'), true);
    document.getElementById('inner-box-1')?.addEventListener('click', (e) => handleClick(e, 'inner-box-1', true, 'normal'), true);
  }, [handleClick]);

  useEffect(() => {
    // Outer Stop Capture Propagation
    document.getElementById('outer-box-2')?.addEventListener('click', (e) => handleClick(e, 'outer-box-2', false, 'normal'), false);
    document.getElementById('middle-box-2')?.addEventListener('click', (e) => handleClick(e, 'middle-box-2', false, 'normal'), false);
    document.getElementById('inner-box-2')?.addEventListener('click', (e) => handleClick(e, 'inner-box-2', false, 'normal'), false);
    document.getElementById('outer-box-2')?.addEventListener('click', (e) => handleClick(e, 'outer-box-2', true, 'stopPropagation'), true);
    document.getElementById('middle-box-2')?.addEventListener('click', (e) => handleClick(e, 'middle-box-2', true, 'normal'), true);
    document.getElementById('inner-box-2')?.addEventListener('click', (e) => handleClick(e, 'inner-box-2', true, 'normal'), true);
  }, [handleClick]);

  useEffect(() => {
    // Middle Stop Bubbling Propagation
    document.getElementById('outer-box-3')?.addEventListener('click', (e) => handleClick(e, 'outer-box-3', false, 'normal'), false);
    document.getElementById('middle-box-3')?.addEventListener('click', (e) => handleClick(e, 'middle-box-3', false, 'stopPropagation'), false);
    document.getElementById('inner-box-3')?.addEventListener('click', (e) => handleClick(e, 'inner-box-3', false, 'normal'), false);
    document.getElementById('outer-box-3')?.addEventListener('click', (e) => handleClick(e, 'outer-box-3', true, 'normal'), true);
    document.getElementById('middle-box-3')?.addEventListener('click', (e) => handleClick(e, 'middle-box-3', true, 'normal'), true);
    document.getElementById('inner-box-3')?.addEventListener('click', (e) => handleClick(e, 'inner-box-3', true, 'normal'), true);
  }, [handleClick]);

  return (
    <div className="event-capture-and-event-bubbling">
      <h2>Event Capture and Event Bubbling</h2>

      <div className="example-container">
        <h2>Capture and Bubbling</h2>
        <div className="outer-box" id="outer-box-1">
          <div className="middle-box" id="middle-box-1">
            <div className="inner-box" id="inner-box-1">
              Click Me
            </div>
          </div>
        </div>
      </div>

      <div className="example-container">
        <h2>Outer Stop Capture Propagation</h2>
        <div className="outer-box" id="outer-box-2">
          <div className="middle-box" id="middle-box-2">
            <div className="inner-box" id="inner-box-2">
              Click Me
            </div>
          </div>
        </div>
      </div>

      <div className="example-container">
        <h2>Middle Stop Bubbling Propagation</h2>
        <div className="outer-box" id="outer-box-3">
          <div className="middle-box" id="middle-box-3">
            <div className="inner-box" id="inner-box-3">
              Click Me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
