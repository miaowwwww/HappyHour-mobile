import React, { PureComponent, Component, PropTypes } from 'react';

import default_user from '../images/default_user.png';
import '../css/CommentList.less';

export default class CommentList extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<ul className='CommentList' >
				<li>
					<img src={default_user} />
					<div>
						<h1>就是一条狗 <small>8分钟前</small></h1>
						<p><em>回复 我也是：</em>姐你太搞笑哈哈哈哈哈哈哈哈</p>
					</div>
				</li>
			</ul>
		)
	}
}

CommentList.defaultProps = {
	commentList: [
		{
			form: '就是一条狗'
		}
	]
}