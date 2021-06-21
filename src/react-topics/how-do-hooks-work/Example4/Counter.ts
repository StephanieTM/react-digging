import { MyReact } from './MyReact';
import { IComponent } from './interface';

function Counter(): IComponent {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState('foo');

  MyReact.useEffect(() => {
    console.log('effect', count, text);
  }, [count, text]);

  return {
    click: () => setCount(count + 1),
    title: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render: ', { count, text }),
  };
}

export function tryExample4(): void {
  let App: IComponent;
  App = MyReact.render(Counter);
  // effect 0 foo
  // render { count: 0, text: 'foo' }

  App.click();
  App = MyReact.render(Counter);
  // effect 1 foo
  // render { count: 1, text: 'foo' }

  App.title('bar');
  App = MyReact.render(Counter);
  // effect 1 bar
  // render { count: 1, text: 'bar' }

  App.noop();
  App = MyReact.render(Counter);
  // no effect run
  // render { count: 1, text: 'bar' }

  App.click();
  App = MyReact.render(Counter);
  // effect 2 bar
  // render { count: 2, text: 'bar' }
}
