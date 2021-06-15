import React, { useState } from 'react';
import { Button } from 'antd';
import SomeComponent from './Comp';

const NAMES = ['Amber', 'Beth', 'Catherine'];
const UNUSED_PROPS = ['AhHah', 'BlaBla', 'CoughCough'];

export default function Comp(): JSX.Element {
  const [name, setName] = useState<number>(0);
  const [unusedProp, setUnusedProp] = useState<number>(0);

  function handleNameChange(): void {
    setName((name + 1) % NAMES.length);
  }

  function handleUnusedPropChange(): void {
    setUnusedProp((unusedProp + 1) % UNUSED_PROPS.length);
  }

  return (
    <div>
      <Button onClick={handleNameChange}>Update Used Prop</Button>
      <Button onClick={handleUnusedPropChange}>Update Unused Prop</Button>
      <SomeComponent
        name={NAMES[name]}
        unusedProp={UNUSED_PROPS[unusedProp]}
      />
    </div>
  );
}
