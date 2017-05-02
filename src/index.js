import 'babel-polyfill';
import 'fetch-polyfill';
import 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';
import RootRouter from './routers';
// import configStore from './store/configStore.js';
// const store = configStore();
import store from './store/configStore.js';
import './css/reset.less';
import './font/iconfont.less';
import './css/index.less';
import './css/animate.less';
import './api/reset.js';
// import { AppContainer } from 'react-hot-loader'

// const render = Component => {
//   ReactDOM.render(
//     <AppContainer>
//       <Provider store={store}>
//       {Component}
//       </Provider>
//     </AppContainer>,
//     document.getElementById('root')
//   )
// }
// render(RootRouter)
// if (module.hot) {
//   module.hot.accept('./routers', () => { render(RootRouter) })
// }

ReactDOM.render(
	<Provider store={store}>
		{RootRouter}
	</Provider>,
 document.getElementById('root')
);





// render(
// 	RootRouter,
// 	document.body.appendChild(document.createElement('div'))
// );

