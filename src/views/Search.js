import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import utils from '../api/utils';
import "../css/Search.less";
import Toast from '../components/Toast';
import UserVideo from '../components/UserVideo';
import { videoHttpServer, userHttpServer } from '../api/HttpServer';
import store from '../store/configStore';
import { SearchBar } from 'antd-mobile';
import VideoItem from '../components/VideoItem'
import UserItem from '../components/UserItem';
import NoFound from '../components/NoFound';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			videos: [],
			pn: 1,
			searchKey: '',
			type: 'users',
			isSearched: false
		};
		this.timer;
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	handleSearchChange = (value) => {
		clearTimeout(this.timer);
		this.setState({ searchKey: value }, this.searchIfNeed)
	}

	handleTypeChange = (e) => {
		this.setState({ type: e.target.type }, this.searchIfNeed);
	}

	searchIfNeed() {
		if (!this.state.searchKey) { return; }
		let { type } = this.state;

		if (type == 'users') {
			return this.searchUser();
		}
		if (type == 'videos') {
			return this.searchVideo();
		}
	}

	searchUser() {
		if (!this.state.searchKey) { return; }
		this.timer = setTimeout(() => {
			userHttpServer.search(this.state.searchKey, this.state.pn)
				.then(({ users }) => {
					this.setState({ users, isSearched: true })
				})
				.catch(err => Toast.show({ text: err.toString() }))
		}, 500);
	}

	searchVideo() {
		if (!this.state.searchKey) { return; }
		this.timer = setTimeout(() => {
			videoHttpServer.search(this.state.searchKey, this.state.pn)
				.then(({ videos }) => {
					this.setState({ videos, isSearched: true  })
				})
				.catch(err => Toast.show({ text: err.toString() }))
		}, 500);
	}

	get userlist() {
		return this.state.users.map(user => {
			return <UserItem key={user._id} user={user} />
		})
	}

	get videolist() {
		return this.state.videos.map(video => {
			return <VideoItem key={video._id} video={video} />
		})
	}

	render() {
		return (
			<div className="Search">
				<SearchBar
					className="Search-top"
					value={this.state.searchKey}
					placeholder={this.state.type == 'users' && '搜索用户' || '搜索视频'}
					onClear={() => this.setState({ searchKey: '' })}
					onCancel={() => this.props.router.goBack()}
					showCancelButton
					onChange={this.handleSearchChange}
				/>
				<ul className="Search-type" onClick={this.handleTypeChange}>
					<li type="users" className={this.state.type == 'users' && 'select'}>用户</li>
					<li type="videos" className={this.state.type == 'videos' && 'select'}>视频</li>
				</ul>
				<div className="Search-content">
					{
						this.state.type == 'users' &&
						this.userlist ||
						this.videolist
					}
					{ this.state.isSearched && <NoFound text={'找不到匹配的了啦'} />}
				</div>
			</div>
		)
	}
}

