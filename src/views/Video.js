import React, {Component, PropTypes} from 'react';

import video from '../virtual_data/video.js';
import utils from '../api/utils.js';
import '../css/Video.less';
import CommentList from '../components/CommentList.js';
import CommentTextarea from '../components/CommentTextarea.js';


class Video extends Component {
	constructor(props) {
		super(props);
	}

	handlerComment = async() => {
		const content = await CommentTextarea.show();
		if(content) {
			const { video, commentAdd } = this.props;
			commentAdd({content, video: video._id})
		}
	}

	render() {
		const {video} = this.props;
		const {user} = video;
		console.log(this.props);
		return (
			<div className='Video'>
				<i className="icon-back iconfont icon-roundclose"
					onClick={() => this.props.router.goBack()}
				></i>
				<video 
					controls 
					poster={utils.poster(video.poster)}
					preload='ture'
					// autoPlay='ture'
					>
					<source src={`/video/${video.flash}`} type="video/mp4" />
					您的浏览器不支持 HTML5 video 标签。
				</video>
				<section>
					<header>
						<h1>{video.title}</h1>
						<p>{video.meta.createAt}</p>
						<img src={ utils.header(video.user.header) } />
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

function mapStateToProps(state, ownProps) {
	const { id } = ownProps.params;
	return {
		video: state.videos.list.find( item => item._id == id)
	}
}
function mapDispatchToProps(dispatch) {
	return {
		goodVideo: ({videoId, userId}) => dispatch(queryCommentList(videoId)),
		commentAdd: (comment) => dispatch(commentAdd(comment)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);