import React, { useState } from 'react';
import { Button } from 'antd';
import ChildComp from './ChildComp';

export default function Comp(): JSX.Element {
  const [mount, setMount] = useState(false);
  const [timestamp, setTimeStamp] = useState(new Date().getTime());

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setMount(!mount)}>
        {mount ? 'Unmount child comp' : 'Mount child comp'}
      </Button>
      {mount ? (
        <>
          <ChildComp
            timestamp={timestamp}
          />
          <Button onClick={() => setTimeStamp(new Date().getTime())}>Change props</Button>
        </>
      ) : null}
    </div>
  );
}
