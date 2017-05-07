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
			},
			isCollecting: false,
			isGooding: false,
			isUser: false,
		}
		this.user = {...this.props.user};
	}
	
	componentDidMount() {
		const { id } = this.props.params;
		videoHttpServer.getVideo(id)
			.then(({video}) => {
				/* 检查是否已经收藏了，是否已经点赞了,
				 * 服务器应该保存一份user信息，通过服务器保存的那份，
				 * 判断是否已经点赞，是否已经为收藏 
				 * */
				let isGooding = this.user.goodVideo.indexOf(video._id) > -1;
				let isCollecting = this.user.collectVideo.indexOf(video._id) > -1;
				let isUser = this.user._id == video.user._id;
				this.setState({video, isGooding, isCollecting, isUser})
			})
			.catch(err => Toast.show({text: err.toString()}))
	}

	componentWillUnmount() {
		this.props.updateUser(this.user);
	}

	handleComment = async() => {
		const content = await CommentTextarea.show();
		if(content) {
			const { video, commentAdd } = this.props;
			const { _id } = this.state.video;
			commentAdd({content, video: _id})
		}
	}

	handleGoodClick = () => {
		const { video, isGooding } = this.state;
		if(!this.user._id) { return Toast.show({text: '请先登录'})}
		videoHttpServer.goodVideo(video._id, this.user._id)
			.then( ({ok}) => {
				let { goodCount } = this.state.video;
				goodCount = !isGooding ? ++goodCount : --goodCount;
				this.setState({
					isGooding: !isGooding,
					video: {
						...this.state.video,
						goodCount: goodCount
					}
				})
				Toast.show({text: ok});
				/* 关注或取消关注成功，需要更新this.user的信息，并WinllUNmout的时候dispatch出去 */
				!isGooding && 
				this.user.goodVideo.push(video._id) || 
				this.user.goodVideo.filter(value => value != video._id)

			})
			.catch( err => Toast.show({text: err}))
	}

	handleCollect = () => {
		const { video, isCollecting } = this.state;
		if(!this.user._id) { return Toast.show({text: '请先登录'})}
		videoHttpServer.collectVideo(video._id, this.user._id)
			.then( ({ok}) => {
				this.setState({
					isCollecting: !isCollecting
				})
				Toast.show({text: ok});
				/* 收藏或取消收藏成功，需要更新this.user的信息，并WinllUNmout的时候dispatch出去 */
				!isCollecting && 
				this.user.collectVideo.push(video._id) || 
				this.user.collectVideo.filter(value => value != video._id)
			})
			.catch( err => Toast.show({text: err}))
	}

	handleDelect = () => {
		const { video } = this.state
		console.log(this.state.video._id)
		videoHttpServer.deleteVideo(video._id, this.user._id)
			.then(({ok}) => {
				Toast.show({text: ok}).then(() => {
					this.props.router.goBack();
				})
			})
			.catch(err => Toast.show({text: err}))
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
				<video 
					controls 
					poster={utils.poster(video.poster)}
					preload={false}
					// autoPlay='ture'
					>
					{ video.flash && <source src={`/video/${video.flash}`} type="video/mp4" />}
					您的浏览器不支持 HTML5 video 标签。
				</video>
				<section>
					<header>
						<h1>{video.title}</h1>
						<p>{video.createAt}</p>
						<Link to={`person/${video.user._id}`}><img src={ utils.header(video.user.header)  } /></Link>
					</header>
					<p>{video.introduction}</p>
					<ul>
						<li><i className="iconfont icon-kanguo"></i> {video.seeCount}</li>
						<li onClick={this.handleCollect}
							className={this.state.isCollecting && 'select-collect'}
						>
							<i className="iconfont icon-shoucang"></i>{this.state.isCollecting && '已'}收藏
						</li>
						<li onClick={this.handleGoodClick}
							className={this.state.isGooding && 'select-good'}
						>
							<i className="iconfont icon-zan"></i> {video.goodCount}
						</li>
						<li onClick={this.handleComment}>
							<i className="iconfont icon-pinglun"></i> 
							{video.commentCount}
						</li>
						{
							this.state.isUser &&
							<li onClick={this.handleDelect}>
								<i className="iconfont icon-shanchu"></i> 
							</li>
						}
					</ul>
				</section>
				<CommentList videoId={this.props.params.id} />
			</div>
		)
	}
}


// import { goodVideo } from '../actions/videos.js';
import { updateUser } from '../actions/user'
import { commentAdd } from '../actions/comment';
import { connect } from 'react-redux';

// 通过location.state来拿吧
// function mapStateToProps(state, ownProps) {
// 	const video = ownProps.location.state.video;
// 	return {
// 		video: video
// 	}
// }
// 通过redux
function mapStateToProps(state) {
	return {
		user: state.user
	}
}
function mapDispatchToProps(dispatch) {
	return {
		// goodVideo: ({videoId, userId}) => dispatch(queryCommentList(videoId)),
		commentAdd: (comment) => dispatch(commentAdd(comment)),
		updateUser: (user) => dispatch(updateUser(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);