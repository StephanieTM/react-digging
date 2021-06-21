import { MyReact } from './MyReact';
import { IComponent } from './interface';

function Counter(): IComponent {
  const [count, setCount] = MyReact.useState(0);

  MyReact.useEffect(() => {
    console.log('effect', count);
  }, [count]);

  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log('render: ', { count }),
  };
}

export function tryExample3(): void {
  let App;
  App = MyReact.render(Counter);
  // effect 0
  // render: { count: 0 }

  App.click();
  App = MyReact.render(Counter);
  // effect 1
  // render: { count: 1 }

  App.noop();
  App = MyReact.render(Counter);
  // no effect run
  // render: { count: 1 }

  App.click();
  App = MyReact.render(Counter);
  // effect 2
  // render: { count: 2 }
}
