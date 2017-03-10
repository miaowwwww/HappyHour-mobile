import React from 'react';
import img_banner from 'images/default.png';
import style from './PageSelect.less';

import Video from 'components/Video.js';


class PageSelect extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		this.props.getList();
	}
	render() {
		console.log('pageSelect', this.props.videos)
		let videos = this.props.videos;
		console.log('11',videos)
		return (
			<div id={style.pageSelect}>
				<header>
					<img src={img_banner} />
					<p>星期一，3月6日</p>
					<i className={style.search}></i>
				</header>
				{videos && videos.map((item) => <Video key={item.id} data={item} /> )}
			</div>
		)
	}
};

module.exports = PageSelect;