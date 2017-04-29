import React, {Component, PropTypes} from 'react';

import video from '../virtual_data/video.js';
import utils from '../api/utils.js';
import '../css/Video.less';
import definedhistory from '../history';
import CommentList from '../components/CommentList.js';
import CommentTextarea from '../components/CommentTextarea.js';

import header_img from '../images/default_user.png';



class Video extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	handlerComment = async() => {
		const content = await CommentTextarea.show();
		if(content) {
			const { commentAdd } = this.props;
			const { _id } = this.props.location.state.video;
			commentAdd({content, video: _id})
		}
	}

	handleClick = () => {

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
						<li onClick={this.handlerComment}><i className="iconfont icon-pinglun"></i> {video.commentCount}</li>
					</ul>
				</section>
				<CommentList videoId={video._id} />
			</div>
		)
	}
}


import { goodVideo } from '../actions/videos.js';
import { commentAdd } from '../actions/comment.js';
import { connect } from 'react-redux';

function findVideo(state) {
	
}

function mapStateToProps(state) {
	return {
		video: findVideo(state)
	}
}


function mapDispatchToProps(dispatch) {
	return {
		goodVideo: ({videoId, userId}) => dispatch(queryCommentList(videoId)),
		commentAdd: (comment) => dispatch(commentAdd(comment)) 
	}
}

export default connect(null, mapDispatchToProps)(Video);