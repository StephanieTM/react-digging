import { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { createContainer } from 'unstated-next';
import { IRouteConfig, mobileRoutes, pcRoutes } from '../routers/routes';
import { getApplication, findActiveApp } from './utils';
import { IValue, IApplication } from './interface';

const pcApps = getApplication(pcRoutes);
const mobileApps = getApplication(mobileRoutes);

function useGlobalStore(): IValue {
  const isMobile = useMediaQuery({ query: '(max-width: 540px)' });
  const apps = useMemo(() => {
    return isMobile ? mobileApps : pcApps;
  }, [isMobile]);
  const [currentApp, setCurrentApp] = useState<IApplication|Record<string, never>>(() => findActiveApp(apps));
  const [appDrawerVisible, setAppDrawerVisible] = useState<boolean>(false);
  const menus = useMemo<IRouteConfig[]>(() => {
    return ((currentApp as IApplication).menus || []);
  }, [currentApp]);

  return {
    apps,
    menus,
    currentApp,
    setCurrentApp,
    appDrawerVisible,
    setAppDrawerVisible,
    isMobile,
  };
}

export default createContainer<IValue>(useGlobalStore);
