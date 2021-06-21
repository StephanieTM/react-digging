export interface IComponent {
  render: () => void;
  title: (val: string) => void;
  click: () => void;
  noop: () => void;
}

export type IRender = (Component: () => IComponent) => IComponent;

export type IUseState<T> = (initialValue: T) => [T, (newVal: T) => void];

export type IUseEffect = (callback: () => void, depArray: unknown[]) => void;

export interface IMyReact {
  render: IRender;
  useState<T>(initialValue: T): [T, (newVal: T) => void];
  useEffect: IUseEffect;
}
