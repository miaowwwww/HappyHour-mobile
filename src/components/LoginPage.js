import React, { PureComponent } from 'react';
import style from './Login.less';

export default class Login extends PureComponent {
	
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		alert('登录成功');
		this.props.router.goBack();
	}

	handleClose = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.router.goBack();
	}

	render() {
		return (
			<div id={style.login}>
				<div className={style.blackBg}></div>
				<i className={style.close} onClick={this.handleClose}>X</i>
				<h1>开眼世界</h1>
				<p>登录优即可评论即同步已收藏的视频</p>
				{ this.state.isLogining && <p>正在登陆。。。</p>}
				<form>
					<label><i>♀</i><input type="text" ref="account" placeholder="请输入邮箱或电话" /></label>
					<label><i>♂</i><input type="password" ref="password" placeholder="请输入密码" /></label>
					<a className={style.submit} onClick={this.handleSubmit} >登录</a>
					<a>新用户请注册</a>
				</form>
			</div>
		)
	}
};