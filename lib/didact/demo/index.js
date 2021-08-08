/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import Didact from '../src';

/** @jsx Didact.createElement */
function Counter() {
  const [count, setCount] = Didact.useState(1);

  return (
    <div style="color: orange">
      <div><button onClick={() => setCount(c => c + 1)}>Add</button></div>
      <div>Count: {count}</div>
    </div>
  );
}

const element = <Counter />;
const container = document.getElementById('root');

Didact.render(element, container);
