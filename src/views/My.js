import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Login from '../components/Login.js';

import { connect } from 'react-redux';
import { syncLogin } from '../actions/user.js';

import '../css/My.less';

export class My extends Component {

	constructor(props, context) {
		super(props);
		this.state = {};
	}

	handleClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		Login.show().then( user => {
			this.props.dispatch( syncLogin( user ) );
		})
	}

	render() {
		console.log(this.props.user);
		let { account, name, img } = this.props;
		return (
			<div className='My'>
				<header className='My-Top'>
					<i className='icon iconfont icon-xitongcaidan' ></i>
					<img src={ img } onClick={this.handleClick} />
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

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(My);