import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { gsap } from 'gsap';
import GlobalStore from 'app/layout/global-store';
import { findActiveApp } from 'app/layout/utils';
import { IApplication } from 'app/layout/interface';

interface IMenu {
  code: string;
  name: string;
  order: number;
  link: string;
}

/**
 * curActive: [Left, Top, Right]
 */
const orderMap = {
  1: [3, 1, 2],
  2: [1, 2, 3],
  3: [2, 3, 1],
};

enum Position {
  LEFT = 0,
  TOP = 1,
  RIGHT = 2,
}

const classNameMap = {
  [Position.LEFT]: 'menu-left',
  [Position.TOP]: 'menu-top',
  [Position.RIGHT]: 'menu-right',
}

export default withRouter(Footer);

function Footer(props: RouteComponentProps): JSX.Element {
  const { history } = props;
  const { apps, currentApp, setCurrentApp } = GlobalStore.useContainer();
  const menus: IMenu[] = apps.map(({ code, title, link }, index) => {
    return {
      code,
      name: title || '',
      order: index + 1,
      link: link || '',
    };
  });
  const [open, setOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState(2);

  useEffect(() => {
    setActiveOrder(menus.find(menu => menu.code === currentApp.code)?.order || 2);
  }, [currentApp, menus]);

  useEffect(() => {
    const activeApp = findActiveApp(apps as IApplication[]);
    setCurrentApp(activeApp);
  }, [apps, history.location.pathname, setCurrentApp]);

  useEffect(() => {
    if (open === true) {
      gsap.to('.app-footer-container', { duration: 0.3, visibility: 'visible', bottom: '20px' });
      gsap.to('.app-footer-mask', { duration: 0.3, visibility: 'visible', autoAlpha: 1 });
      gsap.to('.menu-left', { duration: 0.3, top: '120px', left: '8px' });
      gsap.to('.menu-right', { duration: 0.3, top: '120px', right: '8px' });
      gsap.to('.menu-top', { duration: 0.3, top: '15px', right: '75px' });
    } else if (open === false) {
      gsap.to('.app-footer-container', { duration: 0.3, bottom: '-100px' });
      gsap.to('.app-footer-mask', { duration: 0.3, autoAlpha: 0 });
      gsap.to('.menu-left', { duration: 0.3, top: '70px', left: '2px' });
      gsap.to('.menu-right', { duration: 0.3, top: '70px', right: '2px' });
      gsap.to('.menu-top', { duration: 0.3, top: '15px', right: '75px' });
    }
  }, [open]);


  function handleClickMenu(): void {
    if (!open) {
      setOpen(true);
    }
  }

  function handleClickMask(): void {
    setOpen(false);
  }

  function handleClickMenuItem({ link }: IMenu): void {
    if (open) {
      history.push(link);
      setOpen(false);
    }
  }

  function renderMenu(position: Position) {
    const menu = menus.find(item => item.order === orderMap[activeOrder][position]);
    return menu ? (
      <span
        className={`menu-item ${classNameMap[position]}`}
        onClick={() => handleClickMenuItem(menu)}
      >
        {menu?.name}
      </span>
    ) : null;
  };

  return (
    <>
      <div className="app-footer-container">
        <div className="app-footer">
          <div className="outer-circle" onClick={handleClickMenu}>
            <div className="inner-circle" onClick={handleClickMask}></div>
            <div className="menu-container">
              {renderMenu(Position.LEFT)}
              {renderMenu(Position.TOP)}
              {renderMenu(Position.RIGHT)}
            </div>
          </div>
        </div>
      </div>
      <div className="app-footer-mask" onClick={handleClickMask}></div>
    </>
  );
}
