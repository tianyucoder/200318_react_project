import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
//引入IntlProvider，用于做自定义国际化
import {IntlProvider} from 'react-intl'
//引入ConfigProvider，实现antd的国际化
import {ConfigProvider} from 'antd'
//引入自定义语言包
import language from './locales'
//引入antd的语言包
import zh_CN from 'antd/es/locale/zh_CN';
import zh_TW from 'antd/es/locale/zh_TW';
import en from 'antd/es/locale/en_US';
//汇总语言包为一个对象
const antdLanguage = {zh_CN,zh_TW,en}

ReactDOM.render(
  <Provider store={store}>
		<ConfigProvider locale={antdLanguage.zh_CN}>
			<IntlProvider messages={language.zh_CN} locale="en">
				<App/>
			</IntlProvider>
		</ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
