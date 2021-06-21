import { IComponent } from './interface';
import { MyReact } from './MyReact';

function Component(): Pick<IComponent, 'title'|'render'> {
  const [text, setText] = useSplitUrl('www.whatever.com');

  return {
    title: txt => setText(txt),
    render: () => console.log('render: ', { text }),
  };
}

function useSplitUrl(str: string): [string[], (txt: string) => void] {
  const [text, setText] = MyReact.useState(str);
  const masked = text.split('.');
  return [masked, setText];
}

export function tryExample4CustomHook(): void {
  let App: Pick<IComponent, 'title'|'render'>;
  App = MyReact.render(Component);
  // render: { text: ['www', 'whatever', 'com'] }

  App.title('www.blahblah.com');
  App = MyReact.render(Component);
  // render: { text: ['www', 'blahblah', 'com'] }
}
