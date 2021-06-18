import { MyReact } from './MyReact';

function Counter() {
  const [count, setCount] = MyReact.useState(0);

  return {
    click: () => setCount(count + 1),
    render: () => console.log('render: ', { count }),
  };
}

export function tryExample2(): void {
  let App;

  App = MyReact.render(Counter);
  App.click();
  App = MyReact.render(Counter);
}
