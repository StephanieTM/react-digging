import React from 'react';

interface ICompProps {
  name: string;
  unusedProp?: string;
}

let renderCount = 0;

export default function SomeComponent(props: ICompProps): JSX.Element {
  const { name } = props;
  renderCount++;

  return (
    <div>
      <div>Hello {name}!</div>
      <div>The component has been rendered {renderCount} times</div>
    </div>
  );
}
