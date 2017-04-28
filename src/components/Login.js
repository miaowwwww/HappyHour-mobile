import React, { PureComponent } from 'react';
import { userHttpServer } from '../api/HttpServer';
import Model from './Model.js';
import '../css/Login.less';
import Regist from './Regist.js';
import Toast from './Toast.js';

export default class Login extends Model {
	
	constructor(props) {
		super(props);
		this.isloading = false;
	}

	login = () => {
		/* 判断输入 */
		if(!this.refs.account.value || !this.refs.password.value) {
			return Toast.show({text: '请完成输入'});
		}

		/* 防止二次点击 */
		if( this.isloading ) { return ; }
		this.isloading = true;

		/* 发送请求 */
		const user = {
			account: this.refs.account.value,
			password: this.refs.password.value
		};
		userHttpServer.login(user)
			.then(user => {
				this._resolve(user);
				this._removeView();
			})
			.catch(err => {
				console.log(err);
				Toast.show({text: err})
			})
			.finally( () => this.isloading = false );
	}

	regist = () => {
		/* return Promise 可以从注册返回注册过的账号密码，然而让他重新填吧 */
		Regist.show();
	}

	handleSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.login();
	}

	handleClose = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// this._reject('reject');
		this._removeView();
	}

	render() {
		return (
			<div id="Login" className='mask animate-from-bottom'>
				<i className='Login-close iconfont icon-guanbi' 
					 onClick={this.handleClose}></i>
				<h1>开眼世界</h1>
				<p>登录优即可评论即同步已收藏的视频</p>
				<form>
					<label>
						<i className="iconfont icon-geren" ></i>
						<input type="text" ref="account" placeholder="请输入邮箱或电话" />
					</label>
					<label>
						<i className="iconfont icon-mima" ></i>
						<input type="password" ref="password" placeholder="请输入密码" />
					</label>
					<a className='submit' onClick={this.handleSubmit} >登录</a>
					<a onTouchEnd={this.regist}>新用户请注册</a>
				</form>
			</div>
		)
	}
};

