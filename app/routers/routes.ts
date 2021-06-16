import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type ILoadComponent = Promise<{ default: ComponentType<RouteComponentProps>}>;

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
    hideInMenu: true,
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
    hideInMenu: true,
    children: [
      {
        title: 'User',
        link: '/backend-demo/user',
        component: (): ILoadComponent => import('src/components/backendDemo/User'),
      },
    ],
  },
  {
    title: 'React Topics',
    code: 'react-topics',
    children: [
      {
        title: 'render props vs. hooks',
        link: '/react-topics/render-props-vs-hooks',
        component: (): ILoadComponent => import('src/react-topics/render-props-vs-hooks'),
      },
      {
        title: 'will unused props cause rerender',
        link: '/react-topics/will-unused-props-cause-rerender',
        component: (): ILoadComponent => import('src/react-topics/will-unused-props-cause-rerender'),
      },
      {
        title: 'React.memo vs useMemo',
        link: '/react-topics/react-memo-vs-usememo',
        component: (): ILoadComponent => import('src/react-topics/react-memo-vs-usememo'),
      },
      {
        title: 'how to get the previous props or state',
        link: '/react-topics/how-to-get-prev-props-or-state',
        component: (): ILoadComponent => import('src/react-topics/how-to-get-prev-props-or-state'),
      },
      {
        title: 'useEffect cleanup function',
        link: '/react-topics/useeffect-cleanup-function',
        component: (): ILoadComponent => import('src/react-topics/useeffect-cleanup-function'),
      },
    ],
  },
  {
    title: 'Web APIs',
    code: 'web-apis',
    children: [
      {
        title: 'Event Propagation',
        link: '/web-apis/event-propagation',
        component: () => import('src/web-apis/event-propagation'),
      },
      {
        title: 'Prevent Default',
        link: '/web-apis/prevent-default',
        component: () => import('src/web-apis/prevent-default'),
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
