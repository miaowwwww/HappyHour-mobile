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
		if(this.props.user._id) {
			_history.push('userinfo');
			return ;
		}
		Login.show().then( user => {
			this.props.syncLogin( user );
		})
	}

	render() {
		let { account, name, header } = this.props.user;
		return (
			<div className='My'>
				<header className='My-Top'>
					<i className='icon iconfont icon-xitongcaidan' ></i>
					<img src={ utils.header(header) } onClick={this.handleClick} />
					<p>{ name || account || '点击登陆后可评论'}</p>
					<ul>
						<li><i className='iconfont icon-xiangqufill' ></i>我的收藏</li>
						<li><i className='iconfont icon-duanxin'></i>我的评论</li>
					</ul>
				</header>
				<dl className="My-List" >
					<dt>我的消息</dt>
					<dt>我的关注</dt>
					<dt>我的缓存</dt>
					<dt>功能开关</dt>
				</dl>
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { syncLogin } from '../actions/user.js';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
function mapDispatchToProps (dispatch) {
	return {
		syncLogin: (user) => dispatch(syncLogin(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(My);