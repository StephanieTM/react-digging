import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T): T|undefined {
  const valueRef = useRef<T>();
  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
}
