import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import utils from '../api/utils';
import Toast from '../components/Toast';
import { NavBar } from 'antd-mobile';
import { userHttpServer } from '../api/HttpServer';
import store from '../store/configStore';
import NoFound from '../components/NoFound';
import _history from '../store/history';
import UserItem from '../components/UserItem';
import "../css/StarUser.less";

export default class StarUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			pn: 1
		};
	}
	componentDidMount() {
		const { user } = store.getState();
		if(!user || !user._id) { return ;}
		userHttpServer.queryStarUser(user._id, this.state.pn )
			.then(({ users }) => {
				this.setState({users})
			})
			.catch( err => Toast.show({text: err}))
	}


	get userslist() {
		return this.state.users.map(user => {
			return <UserItem key={user._id} user={user} />
		})
	}

	render() {
		return (
			<div className="StarUser">
				<NavBar
					className="StarUser-navbar"
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					>
					我的关注
				</NavBar>
				<div className="StarUser-content">
					{ this.state.users.length > 0 && 
						this.userslist ||
						<NoFound text='没有视频了啦' />
					}
				</div>
			</div>
		)
	}
}

