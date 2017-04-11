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
		// definedhistory.push({pathname: '/videopaly'})
		// this.setState({display:'block'})
		// this._video.play();

	}

	componentDidMount() {
		// this._video.play();
	}

	render() {
		const style = {
			backgroundImage: `url('${utils.img(video.poster)}'`
		}
		let videoStyle = {
			display: this.state.display 
		};

		return (
			<div className='Video'>
				<video 
					controls 
					style={videoStyle} 
					onClick={this.handleClick}
					ref={(video) => {this._video = video}}
					poster={utils.img(video.poster)}
					preload
					>
					<source src="../video/user_flash.mp4" type="video/mp4" />
					您的浏览器不支持 HTML5 video 标签。
				</video>
				<section>
					<header>
						<h1>{video.title}</h1>
						<p>{`#${video.category.name} / ${video.durations}`}</p>
						<img src={utils.img(video.user.img)} />
					</header>
					<p>{video.introduction}</p>
				</section>
				<footer></footer>
			</div>
		)
	}
}