import React from 'react';
import { Button } from 'antd';
import { tryExample1 } from './Example1/Counter';
import { tryExample2 } from './Example2/Counter';

export default function Comp(): JSX.Element {
  return (
    <div>
      <h1>How do hooks work</h1>
      <Button onClick={tryExample1}>Try Example1</Button>
      <Button onClick={tryExample2}>Try Example2</Button>
    </div>
  );
}
