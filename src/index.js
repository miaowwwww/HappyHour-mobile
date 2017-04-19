import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore.js';
import RootRouter from './routers';
import './css/reset.less';
import './font/iconfont.less';
import './css/index.less';
import './css/animate.less';
import './api/reset.js';

render(
	<Provider store={configStore()}>
		{RootRouter}
	</Provider>,
	document.body.appendChild(document.createElement('div'))
);

// render(
// 	RootRouter,
// 	document.body.appendChild(document.createElement('div'))
// );

