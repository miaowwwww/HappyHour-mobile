import React, { Component, PropTypes } from 'react';
import '../css/VideoItem.less';
import utils from '../api/utils.js';
// import Link from './Link.js'; //这个需要延迟，
import {Link} from 'react-router';

export default function VideoItem(props) {
		const { title, durations, category, poster, id } = props.video;
		const style = {
			backgroundImage: `url('${utils.img(poster)}')`
		}
		return (
				<Link className='VideoItem' style={style} to={`/videos`}>
					<h1>{title}</h1>
					<p>{`#${category.name} / ${durations}`}</p>
				</Link>
		)
}	

import definedvideo from '../virtual_data/video.js';
VideoItem.defaultProps = {
		video: definedvideo
}
VideoItem.PropTypes = {
	video: PropTypes.object.isRequired
}