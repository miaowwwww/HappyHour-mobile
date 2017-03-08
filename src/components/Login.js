import React, { PureComponent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import style from './Login.less';

export default class Login extends PureComponent {
	
	constructor(props) {
		super(props);
		this.state = { islogining: false}
		this._promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
		this._container = null;
	}

	static show = () => {
		let div = document.createElement('div');
		let vdom = render(<Login />, div);
		document.body.appendChild(div);
		vdom._container = div;
		return vdom._promise;
	}
	removeView = () => {
		unmountComponentAtNode(this._container);
		this._container.remove();
	}

	handleSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.handleLogin();
		// this._resolve('resolve');
		// this.removeView();
	}

	handleClose = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this._reject('reject');
		this.removeView();
	}

	handleLogin = () => {
		// 发起ajax请求，因为作为独立模块存在所以，脱离redux
		// fetch(url,{body, mothod}).then().catch()
		let user = {
			account: this.refs.account.value,
			password: this.refs.password.value
		};
		this.setState({...this.state, isLogining: true});
		window.setTimeout(() => {
		Promise.race([user])
			.then((data) => {
				console.log('success login', data);
				this._resolve(data);
				this.removeView();
			})
			.catch((reason) => {
				console.log('error login', reason);
			})
		},1000);

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