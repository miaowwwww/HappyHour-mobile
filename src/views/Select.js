import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import '../css/Select.less';
import { Link } from 'react-router'
import VideoItem from '../components/VideoItem.js';
import Banner from '../components/Banner.js';
import { queryVideos } from '../actions/videos.js';
import img_banner from '../images/brand.png';
import Toast from '../components/Toast';


/* 脱离redux */
import { videoHttpServer } from '../api/HttpServer';

export default class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: []
		}
	}

	componentDidMount() {
		videoHttpServer.queryVideos({uri: 'list', type: 'select', pn: 1})
			.then( videos => {
				this.setState({videos})
			})
			.catch( err => Toast.show({text: err.toString()}))
	}

	get videoList() {
		return this.state.videos.map(video => <VideoItem video={video} key={video._id} />)
	}

	render() {
		return (
			<div className='Select'>
				<Banner img={img_banner} 
						text={'星期一 11月3日'} 
						icon={<Link to='/search' className="iconfont icon-sousuo"></Link>}
						 />
				{ this.videoList }
			</div>
		)
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		videos: state.videos
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		queryVideos: ({pn}) => dispatch(queryVideos({type:'select', pn}))
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Select)
