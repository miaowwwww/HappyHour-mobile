import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore.js';
import RootRouter from './routers';
import './css/reset.less';
import './font/iconfont.less';
import './css/index.less';
import './css/animate.less';
import './api/reset.js';
const store = configStore();
import { AppContainer } from 'react-hot-loader'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
		document.body.appendChild(document.createElement('div'))
  )
}
const App = (
		<Provider store={store}>
		{RootRouter}
		</Provider>
)
render(App)
if (module.hot) {
  module.hot.accept('./routers', () => { render(App) })
}

// render(
// 	<Provider store={configStore()}>
// 		{RootRouter}
// 	</Provider>,
// 	document.body.appendChild(document.createElement('div'))
// );





// render(
// 	RootRouter,
// 	document.body.appendChild(document.createElement('div'))
// );

