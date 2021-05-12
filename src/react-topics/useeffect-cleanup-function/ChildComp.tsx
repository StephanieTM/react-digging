import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

function someAsyncFunc(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('promise resolved!');
    }, 2000);
  });
}

export default function ChildComp(props: { timestamp: number }): JSX.Element {
  console.log('before everything');
  const { timestamp } = props;
  const [result, setResult] = useState('');
  const [state, setState] = useState(new Date().getTime());

  console.log('before effects');

  useEffect(() => {
    console.log('after render');
    return () => {
      // this cleanup function gets executed:
      //   - (right after) everytime ChildComp re-renders
      //   - everytime ChildComp unmounts
      console.log('cleanup function with no dependency array');
    };
  });

  useEffect(() => {
    let mounted = true;
    console.log('after the first render');
    someAsyncFunc().then(data => {
      // if setResult without checking whether the component is still mounted, you will get the warning below in the console.
      // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      if (mounted) {
        setResult(data);
      }
    });

    return () => {
      // this cleanup function gets executed:
      //   - everytime ChildComp unmounts
      console.log('cleanup function with [] dependency array');
      mounted = false;
    };
  }, []);

  useEffect(() => {
    console.log('after the render caused by changing of someProp (including the first render)');
    return () => {
      // this cleanup function gets executed:
      //   - everytime prop<timestamp> changes
      //   - everytime ChildComp unmounts
      console.log('cleanup function with [someProp] dependency array');
    };
  }, [timestamp]);

  useEffect(() => {
    console.log('after the render caused by changing of someState (including the first render)');
    return () => {
      // this cleanup function gets executed:
      //   - everytime state<state> changes (right after the re-render that change causes)
      //   - everytime ChildComp unmounts
      console.log('cleanup function with [someState] dependency array');
    };
  }, [state]);

  console.log('after effects');

  return (
    <div>
      <div>
        result: {result}
      </div>
      <Button onClick={() => setState(new Date().getTime())}>Change state</Button>
    </div>
  );
}
