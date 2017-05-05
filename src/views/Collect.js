import React, {Component, PropTypes} from 'react';
import VideoItem from '../components/VideoItem'
import { Link } from 'react-router';
import utils from '../api/utils';
import "../css/Follow.less";
import Toast from '../components/Toast';
import { NavBar } from 'antd-mobile';
import { videoHttpServer } from '../api/HttpServer';
import store from '../store/configStore';
import NoFound from '../components/NoFound';
import UserVideo from '../components/UserVideo';
import _history from '../store/history';

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
		videoHttpServer.queryCollectVideo(user._id, this.state.pn )
			.then(({ videos }) => {
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
			<div className="Collect">
				<NavBar
					className="Collect-navbar"
					mode="light"
					iconName={false}
					onLeftClick={() => _history.goBack()}
					leftContent={<i className="iconfont icon-roundclose"></i>}
					>
					我的收藏
				</NavBar>
				{ this.state.videos.length > 0 && 
					this.VideoList ||
					<NoFound text='没有视频了啦' />
				}
			</div>
		)
	}
}

