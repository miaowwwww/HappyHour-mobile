import React from 'react';

// export default function VideoPlay(props) {
// 	return (
// 		<video controls autoPlay={true} poster="/images/poster.png">
// 			<source src={props.flash} type={props.type} />
// 			您的浏览器不支持 HTML5 video 标签。
// 		</video>
// 	)
// }

export default class VideoPlay extends React.Component {
	componentDidMount() {
		console.log('xxx');
		this.video.play();
	}

	render() {
		const { flash, type} = this.props;
		return (
			<video 
				controls 
				autoPlay={true} 
				poster="/images/poster.png"
				ref={(video) => {this.video = video}}
				>
				<source src={flash} type={type} />
				您的浏览器不支持 HTML5 video 标签。
			</video>
		)
	}
}

VideoPlay.defaultProps = {
	flash: "../video/user_flash.mp4",
	type: 'video/mp4'
}
