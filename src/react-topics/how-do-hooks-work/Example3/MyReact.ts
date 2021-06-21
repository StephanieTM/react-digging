import { IMyReact } from './interface';

/**
 * 实现useState，useEffect，但都是单例(同一个组件中不能同时拥有多个state或effect)
 */

export const MyReact: IMyReact = (function (): IMyReact {
  let _val: unknown, _deps: unknown[];

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
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps ? !depArray.every((el, i) => el === _deps[i]) : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
  };
})();

