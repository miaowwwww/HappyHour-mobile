import React, {Component, PropTypes} from 'react';


import video from '../virtual_data/video.js';
import utils from '../api/utils.js';
import '../css/Video.less';
import definedhistory from '../history';

export default class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			video: video
		}
		this._video = '';
	}

	handleClick = () => {

	}

	componentDidMount() {
		// this._video.play();
	}

	render() {
		const {video} = this.props.location.state;
		console.log(video)

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
						<img src={`/header/${video.user.img}`} />
					</header>
					<p>{video.introduction}</p>
					<ul>
						<li><i></i>观看</li>
						<li><i></i>点赞</li>
						<li><i></i>评论</li>
						<li><i></i>收藏</li>
					</ul>
				</section>
				<footer></footer>
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