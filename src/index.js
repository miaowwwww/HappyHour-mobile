import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import RootRouter from './routers';
import './css/reset.less';
import './font/iconfont.less';
import './css/index.less';

// render(
// 	<Provider store={store}>
// 		{rootRouter}
// 	</Provider>,
// 	document.body.appendChild(document.createElement('div'))
// );

render(
	RootRouter,
	document.body.appendChild(document.createElement('div'))
);


