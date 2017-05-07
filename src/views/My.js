import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Login from '../components/Login.js';
import _history from '../store/history.js';
import utils from '../api/utils';

import '../css/My.less';

export class My extends Component {

	constructor(props, context) {
		super(props);
	}

	handleClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (this.props.user._id) {
			_history.push('userinfo');
			return;
		}
		Login.show().then(user => {
			this.props.syncLogin(user);
		})
	}

	handleLogout = (e) => {
		this.props.logout(this.props.user);
	}

	render() {
		let { user } = this.props;
		return (
			<div className='My'>
				<header className='My-Top'>
					<i className='icon iconfont icon-xitongcaidan' ></i>
					<img src={utils.header(user.header)} onClick={this.handleClick} />
					<p>{user.name || '点击登陆后可评论'}</p>
					<ul>
						<li>
							<Link to='/collect'><i className='iconfont icon-xiangqufill' ></i>我的收藏</Link>
						</li>
						<li>
							<Link to='/star'><i className='iconfont icon-geren'></i>我的关注</Link>
						</li>
					</ul>
				</header>
				<dl className="My-List" >
					<dt><Link to={`/person/${user._id}`}>我的主页</Link></dt>
					<dt><Link to={`/follow`}>我的关注</Link></dt>
					<dt><Link to={`/updatewpd`}>修改密码</Link></dt>
					<dt onClick={this.handleLogout} style={{color: 'red'}}>退出登录</dt>
				</dl>
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { syncLogin, logout } from '../actions/user.js';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
function mapDispatchToProps(dispatch) {
	return {
		syncLogin: (user) => dispatch(syncLogin(user)),
		logout: user => dispatch(logout(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(My);