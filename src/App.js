import React from "react";
import {BrowserRouter} from "react-router-dom";
import Layout from "./layouts";
import {connect} from 'react-redux'
// 引入重置样式
import "./assets/css/reset.css";
//引入IntlProvider，用于做自定义国际化
import {IntlProvider} from 'react-intl'
//引入ConfigProvider，实现antd的国际化
import {ConfigProvider} from 'antd'
//引入自定义语言包
import myLanguage from './locales'
//引入antd的语言包
import zh_CN from 'antd/es/locale/zh_CN';
import zh_TW from 'antd/es/locale/zh_TW';
import en from 'antd/es/locale/en_US';
//汇总语言包为一个对象
const antdLanguage = {zh_CN,zh_TW,en}

function App({language}) {
  return (
		<ConfigProvider locale={antdLanguage[language]}>
			<IntlProvider messages={myLanguage[language]} locale="en">
				<BrowserRouter>
					<Layout/>
				</BrowserRouter>
			</IntlProvider>
		</ConfigProvider>
  );
}
export default connect(
	(state)=>({language:state.language})
)(App)
