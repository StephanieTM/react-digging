import { IMyReact } from './interface';

// module pattern
export const MyReact: IMyReact = (function (): IMyReact {
  let _val: unknown;

  return {
    render: (Component) => {
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
