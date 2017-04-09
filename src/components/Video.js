import React, { PureComponent } from 'react';
import img_banner from 'images/default.png';
import style from './Video.less';

export default class Video extends PureComponent {
	static defaultProps = {
		data: {
			name: 'try to learn js',
			durations: `3'23"`,
			category: '学习',
			producer: '天天影视'
		}
	}
	render() {
		let { name, durations, category } = this.props.data;
		return (
				<section id={style.video}>
					<h1>{name}</h1>
					<p>#{category} / {durations}</p>
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