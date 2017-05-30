import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import '../css/NoticeAdd.less';
import { noticeHttpServer } from '../api/HttpServer';
import Toast from '../components/Toast';
import _history from '../store/history';

export default class NoticeAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
		}
	}
	handleAddNotice = () => {
		const { title, content } = this.state;
		if(!title || !content) { return Toast.show({text: '请完成输入'}) }
		noticeHttpServer.add(this.state)
			.then(res => {
				console.log(res);
				Toast.show({text: res.ok}).then(() => _history.goBack())
			})
			.catch(err => Toast.show({text: err}))
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	render() {
		const { title, content } = this.state;
		return (
			<div className="NoticeAdd">
				<NavBar
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					rightContent={<a onClick={this.handleAddNotice}>发布</a>}
				>
					发布公告
				</NavBar>
				<ul className="NoticeAdd-content">
					<li>
						<label htmlFor="title">主题：</label>
						<input type="text" 
								name="title" 
								value={title}
								onChange={this.handleChange}
								placeholder="请输入..." />
					</li>
					<li>
						<label htmlFor="content">内容：</label>
						<textarea name="content" 
								value={content} 
								onChange={this.handleChange}
								placeholder="请输入内容..." ></textarea>
					</li>
				</ul>
			</div>
		)
	}
}