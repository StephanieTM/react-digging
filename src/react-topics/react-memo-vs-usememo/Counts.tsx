import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function Counts(): JSX.Element {
  const renderCount = useRef(0);

  return (
    <div>
      <p>
        Nothing has changed here but I&apos;ve now rendered&nbsp;
        <span>{(renderCount.current ++)} time(s)</span>
      </p>
    </div>
  );
}

export const ReactMemoCounts = React.memo(Counts);

export function UseMemoCounts(props: { memoizedValue: number, resetMemoizedValue: () => void }): JSX.Element {
  const { memoizedValue, resetMemoizedValue } = props;

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
