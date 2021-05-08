import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'antd';

export function Counts(): JSX.Element {
  const [force, setForce] = useState(0);
  const renderCount = useRef(0);

  console.log('rendered');

  return (
    <div>
      <p>
        I&apos;ll only re-render when you click Force render.
      </p>
      <p>
        I&apos;ve now rendered&nbsp;
        <span>{(renderCount.current ++)} time(s)</span>
      </p>
      <Button onClick={() => setForce(force + 1)}>Force render</Button>
    </div>
  );
}

export const ReactMemoCounts = React.memo(Counts);

export function UseMemoCounts(props: { memoizedValue: number, resetMemoizedValue: () => void }): JSX.Element {
  const { memoizedValue, resetMemoizedValue } = props;

  console.log('memoizedValue :>> ', memoizedValue);

  useEffect(() => {
    return () => {
      // reset memoized value on unmount
      resetMemoizedValue();
    };
  }, [resetMemoizedValue]);

  return (
    <div>
      <p>
        I&apos;ll only re-render when you click Force render.
      </p>
      <p>
        I&apos;ve now rendered&nbsp;
        <span>{memoizedValue} time(s)</span>
      </p>
      <p style={{ color: 'red' }}>Actually this is a bad example, &apos;cause I re-render every time you change a cheese to select. Go check the console.</p>
    </div>
  );
}

export function useForceRender(): [memoizedValue: number, incrementTimes: () => void, resetMemoizedValue: () => void] {
  const [times, setTimes] = useState(0);
  const useMemoRef = useRef(0);

  // uncomment the next line to test that <UseMemoCounts /> will re-render every t ime the parent re-renders.
  // const memoizedValue = useMemoRef.current++;

  // the next line ensures that <UseMemoCounts /> only renders when the times value changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(() => {
    if (times === -1) {
      useMemoRef.current = 0;
      return useMemoRef.current++;
    } else {
      return useMemoRef.current++;
    }
  }, [times]);

  const resetMemoizedValue = useCallback(() => setTimes(-1), []);

  const incrementTimes = () => setTimes(times + 1);

  return [
    memoizedValue,
    incrementTimes,
    resetMemoizedValue
  ];
}

export function useMemoComp(): JSX.Element {
  const Comp = useMemo(() => <Counts />, []);
  return Comp;
}
