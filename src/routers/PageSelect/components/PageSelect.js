import React from 'react';
import img_banner from 'images/default.png';
import style from './PageSelect.less';

import Video from 'components/Video.js';


class PageSelect extends React.Component {
	render() {

		let videos = [
			{id: 1, name: 'learn js with miao 1', category:'广告', time: `5'43"`},
			{id: 2, name: 'learn js with miao 2', category:'广告', time: `5'43"`},
			{id: 3, name: 'learn js with miao 3', category:'广告', time: `5'43"`}
		]


		return (
			<div id={style.pageSelect}>
				<header>
					<img src={img_banner} />
					<p>星期一，3月6日</p>
					<i className={style.search}></i>
				</header>
				{ videos.map((item) => <Video key={item.id} videoData={item} /> )}
			</div>
		)
	}
};

module.exports = PageSelect;