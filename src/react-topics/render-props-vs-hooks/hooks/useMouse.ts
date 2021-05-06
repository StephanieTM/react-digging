import { useCallback, useState } from 'react';
import { IMouse, IMouseHook } from '../interface';

export default function useMouse(): IMouseHook {
  const [mouse, setMouse] = useState<IMouse>({ x: 0, y: 0 });
  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setMouse({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  return [mouse, onMouseMove];
}
