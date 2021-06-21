import { useState } from './useState';

function Counter() {
  const [getCount, setCount] = useState(0);

  return {
    click: () => setCount(getCount() + 1),
    render: () => console.log('render: ', { count: getCount() }),
  };
}

export function tryExample1(): void {
  const C = Counter();
  
  C.render();
  C.click();
  C.render();
}

