import React, { PureComponent, Component, PropTypes } from 'react';

import default_user from '../images/default_user.png';
import '../css/CommentList.less';
import CommentTextarea from './CommentTextarea.js';
import _history from '../store/history.js';
import { videoHttpServer } from '../api/HttpServer';
import Toast from '../components/Toast';

class CommentListItem extends Component {
	constructor(props) {
		super(props);
	}
	handleClickImg = (e) => {
		e.preventDefault();
		e.stopPropagation();
		_history.push(`/person/${this.props.comment.from._id}`)
	}

	handleComment = async() => {
		const content = await CommentTextarea.show();
		if(content) {
			const { commentAdd } = this.props;
			const { video, from } = this.props.comment;
			commentAdd({content, video, to: from })
		}
	}

	handleDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { from, _id, video } = this.props.comment;
		videoHttpServer.deleteComment(from._id, _id, video)
			.then(res => {
				Toast.show({text: res.ok}).then(() => {
					this.props.commentDelete(res.commentId, res.videoId);
				})
			})
			.catch(err => {
				Toast.show({text: err});
			})
	}
	render() {
		const { from, createAt, to, content } = this.props.comment;
		const { header, name, account } = from;
		const { className } = this.props;
		return (
			<li className={`CommentListItem ${className}`}
					onClick={this.handleComment}>
				<img src={`header/${header}`} className="header_img" onClick={this.handleClickImg} />
				<div>
					<h1>{name || account} 
						<small>{createAt}
							{
								this.props.userId == from._id &&
								<i className="icon-shanchu iconfont delete"
									onClick={this.handleDelete}
								></i>
							}
						</small></h1>
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
		const { user } = this.props;
		return list.map(comment => {
			return <CommentListItem 
							key={comment._id} 
							userId={user._id}
							comment={comment}
							commentDelete={this.props.commentDelete}
							commentAdd={this.props.commentAdd} />
		})
	}

	render() {
		return (
			<ul className='CommentList' >
				{ this.getcommentlist }
			</ul>
		)
	}
}

import { connect } from 'react-redux';
import { queryCommentList, commentAdd, commentDelete } from '../actions/comment.js';

function mapStateToProps(state, {videoId}) {
	return {
		commentData: state.comment[videoId] || {list: []},
		user: state.user
	}
}
function mapDispatchToProps(dispatch) {
	return {
		queryCommentList: (videoId) => dispatch( queryCommentList(videoId) ),
		commentAdd: (comment) => dispatch(commentAdd(comment)),
		commentDelete: (comment, video) => dispatch(commentDelete(comment, video)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);