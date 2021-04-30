import { ComponentType } from 'react';

export type ILoadComponent = Promise<{ default: ComponentType<JSX.Element>}>;

export interface IRouteConfig {
  title: string;
  link?: string;
  code?: string;
  key?: string;
  children?: IRouteConfig[];
  component?: () => ILoadComponent;
  hideInMenu?: boolean;
  icon?: JSX.Element;
}

const pcRoutes: IRouteConfig[] = [
  {
    title: 'Home',
    code: 'home',
    children: [
      {
        title: 'Hello World',
        link: '/',
        component: (): ILoadComponent => import('src/components/helloWorld'),
      },
    ],
  },
  {
    title: 'Backend Demo',
    code: 'backend-demo',
    children: [
      {
        title: 'User',
        link: '/backend-demo/user',
        component: (): ILoadComponent => import('src/components/backendDemo/User'),
      },
    ],
  },
];

const mobileRoutes: IRouteConfig[] = [
  {
    title: 'Mine',
    code: 'mine',
    children: [
      {
        title: 'Mine',
        link: '/mine',
        component: (): ILoadComponent => import('src/mobile/mine'),
      },
    ],
  },
  {
    title: 'Home',
    code: 'home',
    children: [
      {
        title: 'Hello World',
        link: '/',
        component: (): ILoadComponent => import('src/components/helloWorld'),
      },
    ],
  },
  {
    title: 'Mall',
    code: 'mall',
    children: [
      {
        title: 'Mall',
        link: '/mall',
        component: (): ILoadComponent => import('src/mobile/mall'),
      },
    ],
  },
  {
    title: 'Login',
    code: 'login',
    hideInMenu: true,
    link: '/login',
    component: (): ILoadComponent => import('src/mobile/login'),
  },
];

export {
  pcRoutes,
  mobileRoutes,
};
