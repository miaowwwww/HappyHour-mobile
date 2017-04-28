import React, { Component, PropTypes } from 'react';
import '../css/UploadVideoFrom.less';
import utils from '../api/utils.js';

export default class UploadVideoFrom extends Component {

	handleClick = () => {
		window._form = this._form;
		utils.xhrUpload('/api/video/upload', 'videouploadform')
	}

	render() {
		return (
			<form name="videouploadform"
						className="UploadVideoFrom" 
						encType="multipart/form-data" 
						method="post"
						action="/api/video/upload"
						ref={(form) => this._form = form} >
				<label htmlFor="title">标题：<input type="text" name="title" /></label>
				<label htmlFor="introduction">简介：<input type="text" name="introduction" /></label>
				<label htmlFor="flash">视频：<input type="file" name="flash" accept="video/*" /></label>
				<label htmlFor="poster">海报：<input type="file" name="poster" accept="image/*" /></label>
				<input type="button" onClick={this.handleClick} value="submit" />
			</form>
		)
	}
}

