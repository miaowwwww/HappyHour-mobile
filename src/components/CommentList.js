import React, { PureComponent, Component, PropTypes } from 'react';

import default_user from '../images/default_user.png';
import '../css/CommentList.less';

class CommentList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const { commentList, queryCommentList, videoId } = this.props;
		if(!commentList.nomore) {
			queryCommentList({videoId, pn: 1});
		}
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

import { connect } from 'react-redux';
import { queryCommentList } from '../actions/comment.js';

function mapStateToProps(state, {videoId}) {
	return {
		commentList: state[videoId] || {list: []}
	}
}
function mapDispatchToProps(dispatch) {
	return {
		queryCommentList: (videoId) => dispatch( queryCommentList(videoId) )
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);