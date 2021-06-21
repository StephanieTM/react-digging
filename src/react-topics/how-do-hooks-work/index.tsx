import React from 'react';
import { Button } from 'antd';
import { tryExample1 } from './Example1/Counter';
import { tryExample2 } from './Example2/Counter';
import { tryExample3 } from './Example3/Counter';
import { tryExample4 } from './Example4/Counter';
import { tryExample4CustomHook } from './Example4/CustomHook';

export default function Comp(): JSX.Element {
  return (
    <div>
      <h1>How do hooks work</h1>
      <h2>See the console.</h2>
      <div><Button onClick={tryExample1}>Try Example1</Button></div>
      <div><Button onClick={tryExample2}>Try Example2</Button></div>
      <div><Button onClick={tryExample3}>Try Example3</Button></div>
      <div><Button onClick={tryExample4}>Try Example4</Button></div>
      <div><Button onClick={tryExample4CustomHook}>Try Example4 Custom Hook</Button></div>
    </div>
  );
}
