import React, { useState } from 'react';
import { Button } from 'antd';
import usePrevious from './usePrevious';

export default function Comp(): JSX.Element {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setCount(count + 1)}>Add count</Button>
      <p>Now: {count}, before: {prevCount}</p>
    </div>
  );
}
