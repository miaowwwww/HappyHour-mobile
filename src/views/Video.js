import React, {Component, PropTypes} from 'react';

import video from '../virtual_data/video.js';
import utils from '../api/utils.js';
import '../css/Video.less';
import CommentList from '../components/CommentList.js';
import CommentTextarea from '../components/CommentTextarea.js';
import { Link } from 'react-router';
import { NavBar } from 'antd-mobile';

/* 脱离redux */
import { videoHttpServer } from '../api/HttpServer';
import Toast from '../components/Toast';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			video: { 
				user: {}, 
				// flash: '1493878750367.mp4'
			}
		}
	}

	componentDidMount() {
		const { id } = this.props.params;
		videoHttpServer.getVideo(id)
			.then(({video}) => {
				this.setState({video})
			})
			.catch(err => Toast.show({text: err.toString()}))
	}

	handlerComment = async() => {
		const content = await CommentTextarea.show();
		if(content) {
			const { video, commentAdd } = this.props;
			commentAdd({content, video: video._id})
		}
	}

	render() {
		const {video} = this.state;
		const {user} = video;
		return (
			<div className='Video'>

				<NavBar
					className="navbar"
					mode="light"
					iconName={false}
					onLeftClick={() => this.props.router.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					>
				</NavBar>
				{ video.flash &&
				<video 
					controls 
					poster={utils.poster(video.poster)}
					preload={false}
					// autoPlay='ture'
					>
					<source src={`/video/${video.flash}`} type="video/mp4" />
					您的浏览器不支持 HTML5 video 标签。
				</video>
				}
				<section>
					<header>
						<h1>{video.title}</h1>
						<p>{video.createAt}</p>
						<Link to={`person/${video.user._id}`}><img src={ utils.header(video.user.header)  } /></Link>
					</header>
					<p>{video.introduction}</p>
					<ul>
						<li><i className="iconfont icon-kanguo"></i> {video.seeCount}</li>
						<li><i className="iconfont icon-shoucang"></i>收藏</li>
						<li><i className="iconfont icon-zan"></i>点赞</li>
						<li onClick={this.handlerComment}><i className="iconfont icon-pinglun"></i> {video.commentCount}</li>
					</ul>
				</section>
				<CommentList videoId={this.props.params.id} />
			</div>
		)
	}
}


import { goodVideo } from '../actions/videos.js';
import { commentAdd } from '../actions/comment.js';
import { connect } from 'react-redux';

// 通过location.state来拿吧
// function mapStateToProps(state, ownProps) {
// 	const video = ownProps.location.state.video;
// 	return {
// 		video: video
// 	}
// }
// 通过redux
// function mapStateToProps(state, ownProps) {
// 	const { id } = ownProps.params;
// 	return {
// 		video: state.videos.list.find( item => item._id == id)
// 	}
// }
function mapDispatchToProps(dispatch) {
	return {
		// goodVideo: ({videoId, userId}) => dispatch(queryCommentList(videoId)),
		commentAdd: (comment) => dispatch(commentAdd(comment)) 
	}
}

export default connect(null, mapDispatchToProps)(Video);