import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import '../css/reset.less';

import rootRouter from './routers/index.js';
import configureStore from './configureStore.js';

const store = configureStore();

render(
	<Provider store={store}>
		{rootRouter}
	</Provider>,
	document.body.appendChild(document.createElement('div'))
);


