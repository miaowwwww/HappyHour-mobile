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

	componentDidMount() {
		const { person, params, personFetchById } = this.props;
		if(person._id) { return ;}
		params.id && personFetchById(params.id);
	}

	handleFollow = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.personFollow(this.props.params.id);
	}

	get videoList() {
		return this.props.person.videos.map(video => <VideoItem video={video} key={video._id} />)
	}
	render() {
		const { person } = this.props;
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
					{person.name}
				</NavBar>
				<Banner 
					className="banner"
					img={utils.header(person.header)} 
					text={
						<div className="info">
						<h1>{person.name}</h1>
						<section>
							<span>{person.followCount} 粉丝</span>丨<span>{person.starCount} 关注</span>
						</section>
						{ 
							person.isUser &&
							<Link to='/userinfo'>编辑个人信息</Link> ||
							<a onClick={this.handleFollow}>关注</a>
						}
						<div>{person.summary}</div>
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
import { personFetchById, personFollow } from '../actions/person.js';



const mapStateToProps = (state, props) => {
	const {id} = props.params;
	return {
		// videos: state.videos,
		person: state.person[id] || {videos: []},/* undefined*/
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		queryVideos: ({ pn }) => dispatch(queryVideos({ sort: 'select', pn })),
		personFetchById: (id) => dispatch(personFetchById(id)),
		personFollow: ( personId ) => dispatch(personFollow(personId)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserView);