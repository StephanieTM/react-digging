import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { IRouteConfig, mobileRoutes, pcRoutes } from 'app/routers/routes';
import GlobalStore from './global-store';
import PCLayout from './pc';
import MobileLayout from './mobile';

function getRoutes(allRouters: IRouteConfig[]): IRouteConfig[] {
  const getFlattenRoutes = (routeItem: IRouteConfig[] = allRouters, result: IRouteConfig[] = []): IRouteConfig[] => {
    routeItem.forEach(item => {
      if (item.children) {
        result.concat(getFlattenRoutes(item.children, result));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  return getFlattenRoutes();
}

export default function AppLayout(): JSX.Element {
  const { isMobile } = GlobalStore.useContainer();
  const routes = getRoutes(isMobile ? mobileRoutes : pcRoutes);

  return (
    <Router>
      {isMobile ? <MobileLayout routes={routes} /> : <PCLayout routes={routes} />}
    </Router>
  );
}