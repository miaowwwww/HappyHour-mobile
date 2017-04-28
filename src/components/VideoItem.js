import React, { Component, PropTypes } from 'react';
import '../css/VideoItem.less';
import utils from '../api/utils.js';
// import Link from './Link.js'; //这个需要延迟，
import { Link } from 'react-router';

export default function VideoItem(props) {
	const { title, poster, introduction, _id } = props.video;
	let backgroundImage = '';
	if(!poster) {
		backgroundImage = `url('/images/bg_v.jpg')`;
	}else {
		backgroundImage = `url('/poster/${poster}')`
	}
	const style = {backgroundImage}
	return (
		<Link className='VideoItem' 
					style={ style } 
					to={ {
						pathname: `/videos/${_id}`, 
						state: {video:props.video} } }>
			<h1>{ title }</h1>
			<p>{ introduction }</p>
		</Link>
	)
}


VideoItem.PropTypes = {
	video: PropTypes.object.isRequired
}
