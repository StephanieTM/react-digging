import React from 'react';
import { Link } from 'react-router-dom';
import GlobalStore from 'app/layout/global-store';

export default function Header(): JSX.Element {
  const { apps, setCurrentApp } = GlobalStore.useContainer();

  return (
    <div className="app-header">
      {apps.filter(app => !app.hideInMenu).map(app => (
        <div key={app.code}>
          <Link to={app.menus?.[0]?.link || ''} onClick={() => {
            setCurrentApp(app);
          }}>
            {app.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
