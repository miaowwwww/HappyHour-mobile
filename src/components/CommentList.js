import React, { PureComponent, Component, PropTypes } from 'react';

import default_user from '../images/default_user.png';
import '../css/CommentList.less';
import CommentTextarea from './CommentTextarea.js';
import _history from '../store/history.js';

class CommentListItem extends Component {
	constructor(props) {
		super(props);
	}
	handleClickImg = (e) => {
		e.preventDefault();
		e.stopPropagation();
		_history.push(`/person/${this.props.comment.from._id}`)
	}

	handlerComment = async() => {
		const content = await CommentTextarea.show();
		if(content) {
			const { commentAdd } = this.props;
			const { video, from } = this.props.comment;
			commentAdd({content, video, to: from })
		}
	}
	render() {
		const { from, createAt, to, content } = this.props.comment;
		const { header, name, account } = from;
		return (
			<li className="CommentListItem"
					onClick={this.handlerComment}>
				<img src={`header/${header}`} className="header_img" onClick={this.handleClickImg} />
				<div>
					<h1>{name || account} <small>{createAt}</small></h1>
					<p>
						{ to && <em>回复 {to.name}：</em> }
						{ content }
					</p>
				</div>
			</li>
		)
	}
}

class CommentList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const { commentData, queryCommentList, videoId } = this.props;
		if(!commentData.nomore) {
			queryCommentList({videoId, pn: 1});
		}
	}

	get getcommentlist() {
		const { list } = this.props.commentData;
		return list.map(comment => {
			return <CommentListItem 
							key={comment._id} 
							comment={comment}
							commentAdd={this.props.commentAdd} />
		})
	}

	render() {
		console.log(this.props.commentData);
		return (
			<ul className='CommentList' >
				{ this.getcommentlist }
			</ul>
		)
	}
}

import { connect } from 'react-redux';
import { queryCommentList, commentAdd } from '../actions/comment.js';

function mapStateToProps(state, {videoId}) {
	return {
		commentData: state.comment[videoId] || {list: []}
	}
}
function mapDispatchToProps(dispatch) {
	return {
		queryCommentList: (videoId) => dispatch( queryCommentList(videoId) ),
		commentAdd: (comment) => dispatch(commentAdd(comment)) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);