import React, { Component, PropTypes } from 'react';
import '../css/UploadVideoFrom.less';
import utils from '../api/utils.js';
import Toast from '../components/Toast';

export default class UploadVideoFrom extends Component {

	handleClick = () => {
		utils.uploadVideo('videouploadform')
			.then((data) => {
				Toast.show({text: JSON.stringify(data), time: 500});
			})
			.catch( err => Toast.shwo({text: err.toString()}))
	}

	render() {
		return (
			<form name="videouploadform"
						className="UploadVideoFrom" 
						encType="multipart/form-data" >
				<label htmlFor="title">标题：<input type="text" name="title" /></label>
				<label htmlFor="introduction">简介：<input type="text" name="introduction" /></label>
				<label htmlFor="flash">视频：<input type="file" name="flash" accept="video/*" /></label>
				<label htmlFor="poster">海报：<input type="file" name="poster" accept="image/*" /></label>
				<input type="button" onClick={this.handleClick} value="submit" />
			</form>
		)
	}
}

