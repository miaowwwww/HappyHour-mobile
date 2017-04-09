import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import React from 'react';
// 主页app
import App from 'components/App.js';
// 4page
import Follow from './PageFollow/components/PageFollow.js';
import Found from './PageFound/components/PageFound.js';
import My from './PageMy/components/PageMy.js';
// import Select from './PageSelect/components/PageSelect.js';
import Select from './PageSelect/index.js';
// login page
// import LoginPage from 'components/LoginPage.js';
import LoginPage from '../containers/LoginPage.js';




const routers = (
	<Router history={ browserHistory } >
		<Route path='/' component={App}>
			<IndexRedirect to={`found`} component={Select} ></IndexRedirect>
			<Route path={`found`} component={Found}></Route>
			<Route path={`follow`} component={Follow}></Route>
			<Route path={`select`} component={Select}></Route>
			<Route path={`my`} component={My}></Route>
			<Route path={`login`} component={LoginPage}></Route>
		</Route>
	</Router>
)

export default routers;

