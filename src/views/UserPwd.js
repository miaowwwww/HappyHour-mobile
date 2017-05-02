import React, { Component, PropTypes } from 'react';
import { NavBar, InputItem, Button, WhiteSpace, WingBlank} from 'antd-mobile';
import Toast from '../components/Toast.js';
import _history from '../store/history.js';

class UserPwd extends Component {

	constructor(props, context) {
		super(props);
		this.state = {
			oldpwd: '',
			newpwd: '',
			_newpwd: ''
		}
	}

	handleSubmit = () => {
		const {oldpwd, newpwd, _newpwd } = this.state;
		if( !oldpwd || !newpwd || !_newpwd ) {
			return ;
		}
		if( newpwd !== _newpwd ) {
			return Toast.show({text:'新密码不一致'});
		}
		this.props.updatePassword({
			_id: this.props.user._id, 
			oldpwd: oldpwd, 
			newpwd: newpwd 
		})
	}

	handleChange = (value, key) => {
		this.setState({
			[key]: value
		})
	}

	render() {
		const {oldpwd, newpwd, _newpwd } = this.state;
		
		return (
			<div className='UserPwd'>
				<NavBar 
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					>
					修改密码
				</NavBar>
				<InputItem
					maxLength={10}
					value={oldpwd}
					onChange={value => this.handleChange(value, 'oldpwd')}
					>
					旧密码
				</InputItem>
				<InputItem
					placeholder='10个字符以内'
					value={newpwd}
					onChange={value => this.handleChange(value, 'newpwd')}
					maxLength={10}
					>
					新密码
				</InputItem>
				<InputItem
					value={_newpwd}
					onChange={value => this.handleChange(value, '_newpwd')}
					placeholder='再次输入...'
					maxLength={10}
					>
					确认新密码
				</InputItem>
				<WhiteSpace size='xl' />
				<WingBlank size="xl">
					<Button className="btn" type="ghost" onClick={this.handleSubmit}>保存</Button>
				</WingBlank>
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { updatePassword } from '../actions/user.js';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
function mapDispatchToProps (dispatch) {
	return {
		updatePassword: (user) => dispatch(updatePassword(user))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPwd);