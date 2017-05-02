import React, { Component, PropTypes } from 'react';
import _history from '../store/history';
import Toast from '../components/Toast.js';
import { NavBar } from 'antd-mobile';
import utils from '../api/utils.js';
import { Link } from 'react-router';
import Banner from '../components/Banner.js';
import VideoItem from '../components/VideoItem.js'
import '../css/UserView.less';

export class UserView extends Component {
	constructor(props) {
		super(props);
	}
	get videoList() {
		return this.props.videos.list.map(video => <VideoItem video={video} key={video._id} />)
	}
	render() {
		return (
			<div className='UserView'>
				<NavBar
					className="navbar"
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					rightContent={<i onClick={this.handleClick} className="iconfont icon-radiobutton2 submit"></i>}
					>
					miaowwww
				</NavBar>
				<Banner 
					className="banner"
					img={null} 
					text={
						<div className="info">
						<h1>ddadfad</h1>
						<section>
							<span>123 粉丝</span>丨<span>212关注</span>
						</section>
						<a>关注</a>
						</div>
					} 
					/>
				{ this.videoList }
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { updateUser, logout } from '../actions/user.js';

const mapStateToProps = (state) => {
	return {
		videos: state.videos
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		queryVideos: ({ pn }) => dispatch(queryVideos({ sort: 'select', pn }))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserView);