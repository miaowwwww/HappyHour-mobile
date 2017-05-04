import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import React from 'react';
import defineHistory from '../store/history';
// 主页app
import App from '../components/App';
// 4page
import Follow from '../views/Follow';
import Found from '../views/Found';
import My from '../views/My';
import Select from '../views/Select';

// 独立页
import Video from '../views/Video';
import UserInfo from '../views/UserInfo';
import UserPwd from '../views/UserPwd';
import UserView from '../views/UserView';
import Search from '../views/Search';
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
			<Route path='/search' component={Search}></Route>
		</Route>
	</Router>
)

export default routers;

