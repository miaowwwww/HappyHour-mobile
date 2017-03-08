import React from 'react';
import style from './PageFollow.less';
import img_user from 'images/default.png';
import Video from 'components/Video.js';
import VideoSection from './VideoSection.js';

export default class PageFollow extends React.Component {
	render() {
		const _videoSections = [
			{id: 1, data:{}},
			{id: 2, data:{}},
			{id: 3, data:{}},
			{id: 4, data:{}},
		]
		return (
			<div id={style.pageFollow} >
				<nav className={style.nav}>
					<span>全部作者</span>
					<h1>Subscription</h1>
					<i>O</i>
				</nav>
				<div className={style.content}>
					{
						_videoSections.map(item => <VideoSection key={item.id} />)
					}
				</div>
			</div>
		)
	}
};
