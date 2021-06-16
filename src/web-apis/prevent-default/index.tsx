import React from 'react';
import { message } from 'antd';
import './index.less';

export default function Comp(): JSX.Element {
  function handleOuterClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, type: 'normal'|'preventDefault'): void {
    if (type === 'preventDefault') {
      e.preventDefault();
    }
    console.log('outer clicked');
    message.info('outer clicked');
  }

  function handleCheckboxClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>, type: 'normal'|'preventDefault'): void {
    if (type === 'preventDefault') {
      e.preventDefault();
    }
    console.log('checkbox clicked');
    message.info('checkbox clicked');
  }

  return (
    <div className="prevent-default">
      <h1>Prevent Default</h1>

      <div className="example-container">
        <h2>Both Normal</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'normal')}>
          <form>
            <label htmlFor="id-checkbox1">Checkbox</label>
            <input type="checkbox" id="id-checkbox1" onClick={(e) => handleCheckboxClick(e, 'normal')} />
          </form>
        </div>
      </div>

      <div className="example-container">
        <h2>Outer Prevent Default</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'preventDefault')}>
          <form>
            <label htmlFor="id-checkbox2">Checkbox</label>
            <input type="checkbox" id="id-checkbox2" onClick={(e) => handleCheckboxClick(e, 'normal')} />
          </form>
        </div>
      </div>

      <div className="example-container">
        <h2>Checkbox Prevent Default</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'normal')}>
          <form>
            <label htmlFor="id-checkbox3">Checkbox</label>
            <input type="checkbox" id="id-checkbox3" onClick={(e) => handleCheckboxClick(e, 'preventDefault')} />
          </form>
        </div>
      </div>

      <div className="example-container">
        <h2>Both Prevent Default</h2>
        <div className="outer-box" onClick={(e) => handleOuterClick(e, 'preventDefault')}>
          <form>
            <label htmlFor="id-checkbox4">Checkbox</label>
            <input type="checkbox" id="id-checkbox4" onClick={(e) => handleCheckboxClick(e, 'preventDefault')} />
          </form>
        </div>
      </div>
    </div>
  );
}
