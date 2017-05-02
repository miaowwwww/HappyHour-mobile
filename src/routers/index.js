import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import React from 'react';
import defineHistory from '../store/history.js';
// 主页app
import App from '../components/App.js';
// 4page
import Follow from '../views/Follow.js';
import Found from '../views/Found.js';
import My from '../views/My.js';
import Select from '../views/Select.js';

// 独立页
import Video from '../views/Video.js';
import UserInfo from '../views/UserInfo.js';
import UserPwd from '../views/UserPwd.js';
import UserView from '../views/UserView.js';
// import VideoPlay from '../components/VideoPlay';

const routers = (
	<Router history={ defineHistory } >
		<Route path='/' component={App}>
			<IndexRedirect to='/my'></IndexRedirect>
			<Route path='found' component={Found}></Route>
			<Route path='follow' component={Follow}></Route>
			<Route path='select' component={Select}></Route>
			<Route path='my' component={My}></Route>
			<Route path='/videos/:id' component={Video}></Route>
			<Route path='/userinfo' component={UserInfo}></Route>
			<Route path='/updatewpd' component={UserPwd}></Route>
			<Route path='/person/:id' component={UserView}></Route>
		</Route>
	</Router>
)

export default routers;

