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
			<div className='Login'>
				<div className='Login-blackBg'></div>
				<i className='Login-close iconfont icon-guanbi' onClick={this.handleClose}></i>
				<h1>开眼世界</h1>
				<p>登录优即可评论即同步已收藏的视频</p>
				{ this.state.isLogining && <p>正在登陆。。。</p>}
				<form>
					<label><i className="iconfont icon-geren" ></i><input type="text" ref="account" placeholder="请输入邮箱或电话" /></label>
					<label><i className="iconfont icon-mima" ></i><input type="password" ref="password" placeholder="请输入密码" /></label>
					{ requestErrorMsg && <p className={style.err}>{ requestErrorMsg }</p>}
					{ loginErrorMsg && <p className={style.err}>{ loginErrorMsg }</p>}
					<a className='submit' onClick={this.handleSubmit} >登录</a>
					<a>新用户请注册</a>
				</form>
			</div>
		)
	}
};