import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import {IntlProvider} from 'react-intl'
import language from './locales'

ReactDOM.render(
  <Provider store={store}>
		<IntlProvider messages={language.zh_TW} locale="en">
			<App/>
		</IntlProvider>
  </Provider>,
  document.getElementById("root")
);
