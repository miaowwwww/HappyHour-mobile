import React, {Component, PropTypes} from 'react';
import VideoItem from '../components/VideoItem'
import { Link } from 'react-router';
import utils from '../api/utils';
import '../css/UserVideo.less';

export default function UserVideo( { video } ) {
	return (
		<div className="UserVideo">
			<header className="UserVideo-top">
					<Link to={`/person/${video.user._id}`}>
						<img src={utils.header(video.user.header)} />
					</Link>
					<strong>{video.user.name}</strong>
					<span>{video.createAt}</span>
			</header>
			<VideoItem video={video} />
		</div>
	)
}
UserVideo.defaultProps = {
	video: {
		user: {}
	}
}