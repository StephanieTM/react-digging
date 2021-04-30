import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import { IRouteConfig } from 'app/routers/routes';
import Header from './Header';
import './index.less';

interface IPCLayoutProps {
  routes: IRouteConfig[];
}

export default function Layout(props: IPCLayoutProps): JSX.Element {
  const { routes } = props;

  console.log('routes :>> ', routes);

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <div className="app-menu">
          <div>
            menus
          </div>
        </div>
        <div className="app-content">
          <Suspense fallback={<Spin spinning tip="Loading..." />}>
            <Switch>
              {
                routes.map(route => (route.component && route.link) ?
                  <Route key={route.link} exact path={route.link} component={lazy(route.component)} /> :
                  null)
              }
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
