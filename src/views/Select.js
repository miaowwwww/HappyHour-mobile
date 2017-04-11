import React, {Component, PropTypes} from 'react';
import '../css/Select.less';

import VideoItem from '../components/VideoItem.js';
import Banner from '../components/Banner.js';

export default function Select() {
	return (
		<div className='Select'>
			<Banner/>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
			<VideoItem></VideoItem>
		</div>
	)
}
