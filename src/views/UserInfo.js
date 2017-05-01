import React, { Component, PropTypes } from 'react';
import _history from '../store/history';

import { NavBar, List, InputItem, TextareaItem} from 'antd-mobile';
import '../css/UserInfo.less';
import utils from '../api/utils.js';

export class UserInfo extends Component {

	constructor(props, context) {
		super(props);
		this.state = {
			header: ''
		}
	}

	handleClick = async () => {
		let {user} = await utils.updateUserInfo('userInfoForm');
		this.props.updateUser(user);
		
	}

	handleChangeHeader = (e) => {
		console.log(e.target.files);
		utils.getFileData(e.target.files[0]).then(data => {
			this.setState({header: data});
		})
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
						className="UploadVideoFrom" 
						encType="multipart/form-data" 
						>
						<input type="hidden" name="_id" value={user._id}/>
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
								<select defaultValue={user.sex} style={{float: 'right', width: '1em'}}>
									<option value="1">男</option>
									<option value="2" disabled>女</option>
								</select>
							}
							name="sex"
							arrow="horizontal">
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
							defaultValue={user.summery}
							name="summery"
							placeholder="说点什么..."
							rows={3}
							count={140}
						/>
					</List>
				</form>
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { updateUser } from '../actions/user.js';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
function mapDispatchToProps (dispatch) {
	return {
		updateUser: (user) => dispatch(updateUser(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);