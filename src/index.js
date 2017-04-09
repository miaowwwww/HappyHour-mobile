import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';
// import './common/active-footer.js';
import style from '../css/reset.less';

import rootRouter from './routers/index.js';
import configureStore from './configureStore.js';

const store = configureStore();
console.log(store.getState())
render(
	<Provider store={store}>
		{rootRouter}
	</Provider>,
	document.body.appendChild(document.createElement('div'))
);


// const Test = () => {
// 	return (
// 	<div className={style.test}>
// 		<section className={style.section}>
// 			<div className={style.section_content}>
// 				<header className={style.section_header}>i am header</header>
// 				<section className={style.section_section}>
// 					<div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
// 				</section>
// 			</div>
// 		</section>
// 		<footer className={style.footer}></footer>
// 	</div>
// 	)
// }
// render(
// 	<Test />,
// 	document.body.appendChild(document.createElement('div'))
// );