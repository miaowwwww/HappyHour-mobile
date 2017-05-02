import React, { Component, PropTypes } from 'react';
import _history from '../store/history';
import Toast from '../components/Toast.js';
import { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace, WingBlank} from 'antd-mobile';
import '../css/UserInfo.less';
import utils from '../api/utils.js';
import { Link } from 'react-router';

export class UserInfo extends Component {

	constructor(props, context) {
		super(props);
		this.state = {
			header: '',
			summary: this.props.user.summary
		}
	}

	handleSummaryChange = (value) => {
		this.setState({summary: value})
	}

	handleClick = async () => {
		let {user} = await utils.updateUserInfo('userInfoForm');
		await Toast.show({text: '保存成功', time: 500});
		this.props.updateUser(user);
	}

	handleChangeHeader = (e) => {
		utils.getFileData(e.target.files[0]).then(data => {
			this.setState({header: data});
		})
	}

	handleLogout = (e) => {
		this.props.logout(this.props.user);
	}

	render() {
		let { user } = this.props;
		return (
			<div className='UserInfo'>
				<NavBar 
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					rightContent={<i onClick={this.handleClick} className="iconfont icon-radiobutton2 submit"></i>}>
					个人信息
				</NavBar>
				<form name="userInfoForm"
						encType="multipart/form-data" 
						>
					<input type="hidden" name="_id" value={user._id || ''}/>
					<List>
						<List.Item
							extra={ <input type='file' 
												ref={input => this.fileInput = input} 
												accept="image/*" 
												id="file" 
												name="header"
												onChange={this.handleChangeHeader}
												style={{height: 0, width: 0}} />
											}
							arrow="horizontal" 
							onClick={() => this.fileInput.click()} >
							<img src={
											this.state.header ||
											utils.header(user.header)
										} 
								  className="header" />
						</List.Item>
						<InputItem
							defaultValue={user.name}
							name="name"
							maxLength={10}
						>昵称</InputItem>
						<List.Item
							extra={
								// <select name="sex" >
								// 	<option value='1'>男</option>
								// 	<option value='0'>女</option>
								// </select>
								<div>
									<input type='radio' className="my-radio" name='sex' value='1' defaultChecked={user.sex == '1'} />男
									<input type='radio' className="my-radio" name='sex' value='0' defaultChecked={user.sex == '0'} />女
								</div>
							}
							name="sex"
							>
							性别
						</List.Item>
						<InputItem
							defaultValue={user.tel}
							name="tel"
							type="phone"
						>电话</InputItem>
						<InputItem
							defaultValue={user.email}
							name="email"
							type="email"
						>邮箱</InputItem>
						<TextareaItem
							title="简介"
							count={140}
							rows={3}
							value={this.state.summary}
							onChange={this.handleSummaryChange}
							name="summary"
							placeholder="说点什么..."
						/>
					</List>
					<WhiteSpace size='xl' />
					<WingBlank size="xl">
					<Button onClick={() => {_history.push('/updatewpd')}} className="btn" type="ghost">修改密码</Button>
					<WhiteSpace size='md' />
					<Button onClick={this.handleLogout} className="btn" type="warning">退出登录</Button>
					</WingBlank>
				</form>
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { updateUser, logout } from '../actions/user.js';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
function mapDispatchToProps (dispatch) {
	return {
		updateUser: (user) => dispatch(updateUser(user)),
		logout: user => dispatch(logout(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);