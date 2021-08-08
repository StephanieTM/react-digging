/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import Didact from '../src';

function Child() {
  return (
    <div style="color: orange">
      Hello from child component.
    </div>
  );
}

/** @jsx Didact.createElement */
function App(props) {
  return (
    <h1>
      Hi {props.name}
      <Child />
    </h1>
  );
}

const element = <App name="foo" />;
const container = document.getElementById('root');

Didact.render(element, container);
