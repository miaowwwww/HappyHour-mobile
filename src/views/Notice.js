import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import _history from '../store/history';
import '../css/Notice.less';
import { noticeHttpServer } from '../api/HttpServer';
import Toast from '../components/Toast';

class NoticeItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}
	render() {
		const { title, createAt, content } = this.props.notice;
		console.log(createAt)
		let newcreateAt = new Date(createAt)
		console.log(new Date(createAt))
		console.log(newcreateAt.getTime())
		return (
			<div className="NoticeItem">
				<h1 className="title">{title}<span>{createAt}</span></h1>
				<p className="content">
					{content}
				</p>
			</div>
		)
	}
}


export default class Notice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notices: []
		}
	}

	handleAddNotice = () => {
		console.log('add notice')
		_history.push('/noticeadd');
	}


	get NoticeItems() {
		let { notices } = this.state;
		return notices.map((item) => <NoticeItem key={item._id} notice={item}  />)
	}

	componentDidMount() {
		let pn = 1;
		noticeHttpServer.query(pn)
			.then(res => {
				this.setState({
					notices: res.notices
				})
			})
			.catch(err => Toast.show({text: err}))
	}

	render() {
		return (
			<div className="Notice">
				<NavBar
					className="Notice-navbar"
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					rightContent={<a onClick={this.handleAddNotice}>添加</a>}
					>
					系统公告
				</NavBar>
				<div className="Notice-content">
					{this.NoticeItems}
				</div>
			</div>
		)
	}
}