/* eslint-disable react/no-deprecated */
import Didact from '../src';

/** @jsx Didact.createElement */
const container = document.getElementById('root');

const updateValue = e => rerender(e.target.value);

const rerender = value => {
  const element = (
    <div>
      <input placeholder="Your name please..." value={value} onInput={updateValue} />
      <div>Hello {value}</div>
    </div>
  );
  Didact.render(element, container);
};

rerender('World');
