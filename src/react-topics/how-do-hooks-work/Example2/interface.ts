export interface IComponent {
  render: () => void;
  click: () => void;
}

export type IRender = (Component: () => IComponent) => IComponent;

export type IUseState<T> = (initialValue: T) => [T, (newVal: T) => void];

export interface IMyReact {
  render: IRender;
  useState<T>(initialValue: T): [T, (newVal: T) => void];
}
