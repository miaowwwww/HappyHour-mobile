import React from 'react';
import style from './PageFollow.less';
import img_user from 'images/default.png';
import Video from 'components/Video.js';

export default class VideoSection extends React.Component {
	static defaultProps = {
		videoData : { 
			teamName: '天天影视',
			teamImg: '',
			fileData: {
				category: '综艺',
				outPutDateText: '3分钟前',
				from: '每日编辑精选'
			}
		}
	}
	render() {
		let {teamImg, teamName, fileData} = this.props.videoData;

		return (
				<div id={style.videoSection} >
					<header className={style.teamInfo}>
						<img src={teamImg || img_user} />
						<div>
							<h1>{teamName}</h1>
							<p>发布于 #{fileData.category}/收录于 {fileData.from}</p>
						</div>
						<span>{fileData.outPutDateText}</span>
					</header>

					<Video />
				</div>
		)
	}
};
