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
    const documentBubbling = (e: MouseEvent) => handleClick(e, 'document', false, 'normal');
    const documentCapture = (e: MouseEvent) => handleClick(e, 'document', true, 'normal');
    document.addEventListener('click', documentBubbling, false);
    document.addEventListener('click', documentCapture, true);

    return () => {
      document.removeEventListener('click', documentBubbling, false);
      document.removeEventListener('click', documentCapture, true);
    };
  }, [handleClick]);

  useEffect(() => {
    // Capture And Bubbling

    const outer1Bubbling = (e: MouseEvent) => handleClick(e, 'outer-box-1', false, 'normal');
    const middle1Bubbling = (e: MouseEvent) => handleClick(e, 'middle-box-1', false, 'normal');
    const inner1Bubbling = (e: MouseEvent) => handleClick(e, 'inner-box-1', false, 'normal');
    const outer1Capture = (e: MouseEvent) => handleClick(e, 'outer-box-1', true, 'normal');
    const middle1Capture = (e: MouseEvent) => handleClick(e, 'middle-box-1', true, 'normal');
    const inner1Capture = (e: MouseEvent) => handleClick(e, 'inner-box-1', true, 'normal');

    document.getElementById('outer-box-1')?.addEventListener('click', outer1Bubbling, false);
    document.getElementById('middle-box-1')?.addEventListener('click', middle1Bubbling, false);
    document.getElementById('inner-box-1')?.addEventListener('click', inner1Bubbling, false);
    document.getElementById('outer-box-1')?.addEventListener('click', outer1Capture, true);
    document.getElementById('middle-box-1')?.addEventListener('click', middle1Capture, true);
    document.getElementById('inner-box-1')?.addEventListener('click', inner1Capture, true);

    return () => {
      document.getElementById('outer-box-1')?.removeEventListener('click', outer1Bubbling, false);
      document.getElementById('middle-box-1')?.removeEventListener('click', middle1Bubbling, false);
      document.getElementById('inner-box-1')?.removeEventListener('click', inner1Bubbling, false);
      document.getElementById('outer-box-1')?.removeEventListener('click', outer1Capture, true);
      document.getElementById('middle-box-1')?.removeEventListener('click', middle1Capture, true);
      document.getElementById('inner-box-1')?.removeEventListener('click', inner1Capture, true);
    };
  }, [handleClick]);

  useEffect(() => {
    // Outer Stop Capture Propagation

    const outer2Bubbling = (e: MouseEvent) => handleClick(e, 'outer-box-2', false, 'normal');
    const middle2Bubbling = (e: MouseEvent) => handleClick(e, 'middle-box-2', false, 'normal');
    const inner2Bubbling = (e: MouseEvent) => handleClick(e, 'inner-box-2', false, 'normal');
    const outer2Capture = (e: MouseEvent) => handleClick(e, 'outer-box-2', true, 'stopPropagation');
    const middle2Capture = (e: MouseEvent) => handleClick(e, 'middle-box-2', true, 'normal');
    const inner2Capture = (e: MouseEvent) => handleClick(e, 'inner-box-2', true, 'normal');

    document.getElementById('outer-box-2')?.addEventListener('click', outer2Bubbling, false);
    document.getElementById('middle-box-2')?.addEventListener('click', middle2Bubbling, false);
    document.getElementById('inner-box-2')?.addEventListener('click', inner2Bubbling, false);
    document.getElementById('outer-box-2')?.addEventListener('click', outer2Capture, true);
    document.getElementById('middle-box-2')?.addEventListener('click', middle2Capture, true);
    document.getElementById('inner-box-2')?.addEventListener('click', inner2Capture, true);

    return () => {
      document.getElementById('outer-box-2')?.removeEventListener('click', outer2Bubbling, false);
      document.getElementById('middle-box-2')?.removeEventListener('click', middle2Bubbling, false);
      document.getElementById('inner-box-2')?.removeEventListener('click', inner2Bubbling, false);
      document.getElementById('outer-box-2')?.removeEventListener('click', outer2Capture, true);
      document.getElementById('middle-box-2')?.removeEventListener('click', middle2Capture, true);
      document.getElementById('inner-box-2')?.removeEventListener('click', inner2Capture, true);
    };
  }, [handleClick]);

  useEffect(() => {
    // Middle Stop Bubbling Propagation

    const outer3Bubbling = (e: MouseEvent) => handleClick(e, 'outer-box-3', false, 'normal');
    const middle3Bubbling = (e: MouseEvent) => handleClick(e, 'middle-box-3', false, 'stopPropagation');
    const inner3Bubbling = (e: MouseEvent) => handleClick(e, 'inner-box-3', false, 'normal');
    const outer3Capture = (e: MouseEvent) => handleClick(e, 'outer-box-3', true, 'normal');
    const middle3Capture = (e: MouseEvent) => handleClick(e, 'middle-box-3', true, 'normal');
    const inner3Capture = (e: MouseEvent) => handleClick(e, 'inner-box-3', true, 'normal');

    document.getElementById('outer-box-3')?.addEventListener('click', outer3Bubbling, false);
    document.getElementById('middle-box-3')?.addEventListener('click', middle3Bubbling, false);
    document.getElementById('inner-box-3')?.addEventListener('click', inner3Bubbling, false);
    document.getElementById('outer-box-3')?.addEventListener('click', outer3Capture, true);
    document.getElementById('middle-box-3')?.addEventListener('click', middle3Capture, true);
    document.getElementById('inner-box-3')?.addEventListener('click', inner3Capture, true);

    return () => {
      document.getElementById('outer-box-3')?.removeEventListener('click', outer3Bubbling, false);
      document.getElementById('middle-box-3')?.removeEventListener('click', middle3Bubbling, false);
      document.getElementById('inner-box-3')?.removeEventListener('click', inner3Bubbling, false);
      document.getElementById('outer-box-3')?.removeEventListener('click', outer3Capture, true);
      document.getElementById('middle-box-3')?.removeEventListener('click', middle3Capture, true);
      document.getElementById('inner-box-3')?.removeEventListener('click', inner3Capture, true);
    };
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
