export interface IComponent {
  render: () => void;
  title: (val: string) => void;
  click: () => void;
  noop: () => void;
}

export type IRenderReturnType = IComponent|Pick<IComponent, 'title'|'render'>;
export type IRender<T> = (Component: () => T) => T;

export type IUseState<T> = (initialValue: T) => [T, (newVal: T) => void];

export type IUseEffect = (callback: () => void, depArray: unknown[]) => void;

export interface IMyReact {
  render<T>(Component: () => T): T;
  useState<T>(initialValue: T): [T, (newVal: T) => void];
  useEffect: IUseEffect;
}
