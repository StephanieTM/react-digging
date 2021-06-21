import { IComponent, IMyReact } from './interface';

export const MyReact: IMyReact = (function (): IMyReact {
  const hooks: unknown[] = [];
  let currentHook = 0; // array of hooks, and an iterator

  return {
    render<T>(Component: () => T): T {
      const Comp = Component();
      (Comp as unknown as IComponent).render();
      currentHook = 0;
      return Comp;
    },
    useState<T>(initialValue: T): [T, (newVal: T) => void] {
      hooks[currentHook] = (hooks[currentHook] || initialValue) as T;

      const setStateHookIndex = currentHook; // for setState's closure, 用于setState更新当前特定的hook
      const setState = (newState: T) => (hooks[setStateHookIndex] = newState);

      return [hooks[currentHook++] as T, setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = (hooks[currentHook]) as unknown[]|undefined;
      const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++;
    },
  };
})();
