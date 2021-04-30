import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import { IRouteConfig } from 'app/routers/routes';
import Footer from './Footer';
import './index.less';

interface IMobileLayoutProps {
  routes: IRouteConfig[];
}

export default function Layout(props: IMobileLayoutProps): JSX.Element {
  const { routes } = props;

  return (
    <div className="app-container">
      <Suspense fallback={<Spin spinning tip="Loading..." />}>
        <Switch>
          {
            routes.map(route => (route.component && route.link) ?
              <Route key={route.link} exact path={route.link} component={lazy(route.component)} /> :
              null)
          }
        </Switch>
      </Suspense>
      {/* <div className="hello">
        <div>Hello!</div>
        <div>こにちわ!</div>
      </div> */}
      <Footer />
    </div>
  );
}
