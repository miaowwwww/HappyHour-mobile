import React, {Component, PropTypes} from 'react';


import video from '../virtual_data/video.js';
import utils from '../api/utils.js';
import '../css/Video.less';
import definedhistory from '../store/history.js';

export default class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			video: video,
			display: 'none'
		}
		this._video = '';
	}

	handleClick = () => {
		// definedhistory.push({pathname: '/videopaly'})
		this.setState({display:'block'})
		this._video.play();

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
				<header className='mask' style={style}>
					<i className='icon-tabxiala iconfont begin' onClick={this.handleClick} ></i>
					<video 
						controls 
						style={videoStyle} 
						onClick={this.handleClick}
						ref={(video) => {this._video = video}}
						poster={utils.img(video.poster)}
						>
						<source src="../video/user_flash.mp4" type="video/mp4" />
						您的浏览器不支持 HTML5 video 标签。
					</video>
				</header>
				<section>
				</section>
				<footer></footer>
			</div>
		)
	}
}