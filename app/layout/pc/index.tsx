import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Spin } from 'antd';
import { IRouteConfig } from 'app/routers/routes';
import GlobalStore from 'app/layout/global-store';
import Header from './Header';
import './index.less';

interface IPCLayoutProps {
  routes: IRouteConfig[];
}

export default function Layout(props: IPCLayoutProps): JSX.Element {
  const { routes } = props;
  const { currentApp } = GlobalStore.useContainer();
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [currentApp.code]);

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <div className="app-menu">
          <div>
            {currentApp.menus.map(menu => (
              <Link key={menu.link} to={menu.link || ''} onClick={() => setActiveLink(menu.link || '')}>
                <div className={`menu-item ${menu.link === activeLink ? 'active' : ''}`}>
                  {menu.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="app-content">
          <div className="content-container">
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
    </div>
  );
}
