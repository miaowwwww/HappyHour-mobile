import React, {Component, PropTypes} from 'react';
import VideoItem from '../components/VideoItem'
import { Link } from 'react-router';
import utils from '../api/utils';
import "../css/Follow.less";
import Toast from '../components/Toast';

import { videoHttpServer } from '../api/HttpServer';
import store from '../store/configStore';
import img_meiyouxinxi from '../images/meiyouxinxi.gif';

import UserVideo from '../components/UserVideo';

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
		if(!user || !user._id) { return ;}
		videoHttpServer.queryFollowVideos(user._id, this.state.pn )
			.then(({ videos }) => {
				console.log(videos)
				this.setState({videos: videos})
			})
			.catch( err => Toast.show({text: err}))
	}

	get VideoList() {
		return this.state.videos.map(item => {
			return (
				<UserVideo key={item._id} video={item} />
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

