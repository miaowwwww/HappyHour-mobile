import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import React from 'react';
import defineHistory from '../history';
// 主页app
import App from '../components/App.js';
// 4page
import Follow from '../views/Follow.js';
import Found from '../views/Found.js';
import My from '../views/My.js';
import Select from '../views/Select.js';

import Video from '../views/Video.js';
import VideoPlay from '../components/VideoPlay';


const routers = (
	<Router history={ defineHistory } >
		<Route path='/' component={App}>
			<IndexRedirect to='/my'></IndexRedirect>
			<Route path='found' component={Found}></Route>
			<Route path='follow' component={Follow}></Route>
			<Route path='select' component={Select}></Route>
			<Route path='my' component={My}></Route>
		</Route>
		<Route path='/videos' component={Video}></Route>
		<Route path='/videopaly' component={VideoPlay}></Route>
	</Router>
)

export default routers;

