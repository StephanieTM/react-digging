export enum ICompType {
  render_props = '1',
  hooks = '2',
}

export interface IMouse {
  x: number;
  y: number;
}

export type IMouseHook = [mouse: IMouse, onMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void];
