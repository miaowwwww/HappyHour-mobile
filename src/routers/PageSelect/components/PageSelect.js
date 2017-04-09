import React from 'react';
import img_banner from 'images/default.png';
import style from './PageSelect.less';

import Video from 'components/Video.js';


class PageSelect extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		this.props.videos.size === 0 && this.props.getList();
	}
	render() {
		let videos = this.props.videos;
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