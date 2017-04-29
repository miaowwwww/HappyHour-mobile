import React, {Component, PropTypes} from 'react';

import video from '../virtual_data/video.js';
import utils from '../api/utils.js';
import '../css/Video.less';
import definedhistory from '../history';
import CommentList from '../components/CommentList.js';

import header_img from '../images/default_user.png';

export default class Video extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {

	}

	componentDidMount() {
		
	}

	render() {
		const {video} = this.props.location.state;
		const {user} = video;
		let header = header_img;
		if(user.img) {
			header = `/header/${user.img}`
		}

		return (
			<div className='Video'>
				<video 
					controls 
					poster={`/poster/${video.poster}`}
					preload='ture'
					autoPlay='ture'
					>
					<source src={`/video/${video.flash}`} type="video/mp4" />
					您的浏览器不支持 HTML5 video 标签。
				</video>
				<section>
					<header>
						<h1>{video.title}</h1>
						<p>{video.meta.createAt}</p>
						<img src={ header } />
					</header>
					<p>{video.introduction}</p>
					<ul>
						<li><i className="iconfont icon-kanguo"></i> {video.seeCount}</li>
						<li><i className="iconfont icon-shoucang"></i>收藏</li>
						<li><i className="iconfont icon-zan"></i>点赞</li>
						<li><i className="iconfont icon-pinglun"></i> {video.commentCount}</li>
					</ul>
				</section>
				<CommentList commentList />
			</div>
		)
	}
}


function findVideo(state) {
	
}

function mapStateToProps(state) {
	return {
		video: findVideo(state)
	}
}

// import { queryCommentList } from '../actions/video.js';

function mapDispatchToProps(dispatch) {
	return {
		queryCommentList: (videoId) => dispatch(queryCommentList(videoId))
	}
}

// export default connect()