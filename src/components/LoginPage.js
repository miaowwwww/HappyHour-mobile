import React, { PureComponent } from 'react';
import style from './Login.less';

export default class Login extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	handleSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.onSubmit({
			accountId: this._accountId,
			password: this._password
		})
	}

	handleClose = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.router.goBack();
	}

	render() {
		const { isLogining, requestErrorMsg, loginErrorMsg } = this.props.user.toJS();
		return (
			<div id={style.login}>
				<div className={style.blackBg}></div>
				<i className={style.close} onClick={this.handleClose}>X</i>
				<h1>开眼世界</h1>
				<p>登录优即可评论即同步已收藏的视频</p>
				{ isLogining && <p>正在登陆。。。</p>}
				<form>
					<label><i>♀</i><input type="text" ref={account => this._accountId = account} placeholder="请输入邮箱或电话" /></label>
					<label><i>♂</i><input type="password" ref={pwd => this._password = pwd} placeholder="请输入密码" /></label>
					{ requestErrorMsg && <p className={style.err}>{ requestErrorMsg }</p>}
					{ loginErrorMsg && <p className={style.err}>{ loginErrorMsg }</p>}
					<a className={style.submit} onClick={this.handleSubmit} >登录</a>
					<a>新用户请注册</a>
				</form>
			</div>
		)
	}
};