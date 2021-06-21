import { IMyReact } from './interface';

/**
 * 实现useState
 */

// module pattern (function {...})()
export const MyReact: IMyReact = (function (): IMyReact {
  let _val: unknown;

  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState<T>(initialValue: T): [T, (newVal: T) => void] {
      _val = _val || initialValue;

      function setState(newVal: T) {
        _val = newVal;
      }

      return [_val as T, setState];
    },
  };
})();
