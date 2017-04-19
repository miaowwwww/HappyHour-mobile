import React, { PureComponent } from 'react';

import { userHttpServer } from '../api/HttpServer';
import Model from './Model.js';
import '../css/Regist.less';

import Toast from './Toast.js';

export default class Regist extends Model {
	constructor(props) {
		super(props);
		this.isloading = false;
	}

	handleSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.regist();
	}

	handleClose = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// this._reject('reject');
		this._removeView();
	}

	regist = () => {
		/* 防止二次点击 */
		if( this.isloading ) { return ; }
		this.isloading = true;
		/* 判断数据是合理 */
		const {account, email, password, passwordS} = this.refs;
		if(!account.value || !email.value || !password.value || !passwordS.value) {
			Toast.show({text: '请完成输入'});
			return ;
		}
		/* 发送请求 */
		const user = {
			account: account.value,
			email: email.value,
			password: password.value,
			passwordS: passwordS.value
		};
		/* 应该有loading 效果 */
		userHttpServer.regist(user)
			.then(newuser => {
				Toast.show({text: '注册成功，2秒后返回', time: 2000});
				setTimeout(() => {this._removeView()}, 2000);
			})
			.catch(err => {
				Toast.show({text: err, time: 2000});
			})
			.finally( () => this.isloading = false )
	}

	render() {
		return (
			<div id="Regist" className='mask animate-from-bottom'>
				<i className='Regist-close iconfont icon-guanbi' onClick={this.handleClose}></i>
				<form>
					<img />
					<label><i className="iconfont icon-geren" ></i><input type="text" ref="account" placeholder="请输入用户名" /></label>
					<label><i className="iconfont icon-duanxin" ></i><input type="email" ref="email" placeholder="请输入邮箱" /></label>
					<label><i className="iconfont icon-mima" ></i><input type="password" ref="password" placeholder="请输入密码" /></label>
					<label><i className="iconfont icon-mima" ></i><input type="password" ref="passwordS" placeholder="确认密码" /></label>
					<a className='submit' onClick={this.handleSubmit} >注册</a>
				</form>
			</div>
		)
	}
};

