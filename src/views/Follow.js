import React, {Component, PropTypes} from 'react';
import VideoItem from '../components/VideoItem.js'
import { Link } from 'react-router';
import utils from '../api/utils.js';
import "../css/Follow.less";
import Toast from '../components/Toast.js';

import { videoHttpServer } from '../api/HttpServer.js';
import store from '../store/configStore.js';
import img_meiyouxinxi from '../images/meiyouxinxi.gif';


function FollowUserVideo( { video={ user: {} } } ) {
	return (
		<div className="FollowUserVideo">
			<header className="FollowUserVideo-top">
					<Link to={`/person/${video.user._id}`}>
						<img src={utils.header(video.user.header)} />
					</Link>
					<strong>{video.user.name}</strong>
					<span>{video.createAt}</span>
			</header>
			<VideoItem video={video} />
		</div>
	)
}


export default class Follow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			pn: 1
		};
	}
	componentDidMount() {
		const { user } = store.getState();
		console.log(user)
		if(!user || !user._id) { return ;}
		videoHttpServer.queryFollowVideos(user._id, this.state.pn )
			.then(({ videos }) => {
				console.log(videos)
				this.setState({videos: videos})
			})
			// .catch( err => Toast.show({text: err}))
	}

	get VideoList() {
		return this.state.videos.map(item => {
			return (
				<FollowUserVideo key={item._id} video={item} />
			)
		})
	}

	render() {
		return (
			<div className="Follow">
				{ this.state.videos.length > 0 && 
					this.VideoList ||
					<div className="no-info">
						<img src={img_meiyouxinxi} />
						<p>你没有关注的用户或被关注用户没有视频</p>
						<p>快去发现好视频吧</p>
					</div>
				}
			</div>
		)
	}
}

