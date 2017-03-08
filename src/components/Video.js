import React, { PureComponent } from 'react';
import img_banner from 'images/default.png';
import style from './Video.less';

export default class Video extends PureComponent {
	static defaultProps = {
		videoData: {
			name: 'try to learn js',
			time: `3'23"`,
			category: '学习',
			team: '天天影视'
		}
	}
	render() {
		let { name, time, category } = this.props.videoData;
		return (
				<section id={style.video}>
					<h1>{name}</h1>
					<p>#{category} / {time}</p>
				</section>
		)
	}
};


// const Video = function(props) {
// 		let { name, time, category } = props.videoData;
// 		return (
// 				<section id={style.video}>
// 					<h1>{name}</h1>
// 					<p>#{category} / {time}</p>
// 				</section>
// 		)
// }
// module.exports = Video;