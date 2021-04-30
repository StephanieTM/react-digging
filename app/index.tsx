import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { configAxios } from './utils/axios-config';
import AppLayout from './layout';
import GlobalStore from './layout/global-store';
import './index.less';

configAxios();
dayjs.locale('zh-cn');

function App(): JSX.Element {
  return (
    <GlobalStore.Provider>
      <AppLayout />
    </GlobalStore.Provider>
  );
}

const HotApp = hot(App);

ReactDom.render(
  <HotApp />,
  document.getElementById('app')
);
