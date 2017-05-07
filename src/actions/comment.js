import { videoHttpServer } from '../api/HttpServer.js';
/* 获取视频评论 */
export const QUERYCOMMENTLISTING = 'QUERYCOMMENTLISTING'
export const QUERYCOMMENTLISTEND = 'QUERYCOMMENTLISTEND'
export const QUERYCOMMENTLISTERROR = 'QUERYCOMMENTLISTERROR'


function queryCommentListIng(videoId) {
	return {
		type: QUERYCOMMENTLISTING,
		videoId
	}
}
function queryCommentListEnd({list, videoId, nomore}) {
	return {
		type: QUERYCOMMENTLISTEND,
		list,
		videoId,
		nomore
	}
}
function queryCommentListError(err) {
	return {
		type: QUERYCOMMENTLISTERROR,
		err
	}
}
export const queryCommentList = ({videoId, pn}) => {
	return (dispatch, getState) => {
		dispatch(queryCommentListIng(videoId));
		videoHttpServer.queryCommentList({videoId, pn})
			.then( ({list, nomore}) => dispatch(queryCommentListEnd({list, nomore, videoId})))
			.catch( ({err}) => dispatch(queryCommentListError({err, videoId})))
	}
}

/* 评论视频 */
export const COMMENT_ADDBEGIN = 'COMMENT_ADDBEGIN';
export const COMMENT_ADDEND = 'COMMENT_ADDEND';
export const COMMENT_ADDERROR = 'COMMENT_ADDERROR';
function commentAddBegin(videoId) {
	return {
		type: COMMENT_ADDBEGIN
	}
}
function commentAddEnd(comment) {
	return {
		type: COMMENT_ADDEND,
		comment
	}
}
function commentAddError(err) {
	return {
		type: COMMENT_ADDERROR,
		err
	}
}
/* comment: {to: {_id, name}, video, content} ,from从state中获取 */
export const commentAdd = (comment) => {
	return (dispatch, getState) => {
		dispatch(commentAddBegin(comment));
		let {_id, name, header} = getState().user;
		videoHttpServer.commentVideo({...comment, from:{_id, name}})
			.then( (data) => dispatch(commentAddEnd({...comment, ...data, from: {_id, name, header}})))
			.catch( (err) => dispatch(commentAddError(err)))
	}
}



/* 删除评论：用户删除 */
export const COMMENT_DELETE = 'comment_delete';
export const commentDelete = (commentId, videoId) => {
	return {
		type: COMMENT_DELETE,
		commentId,
		videoId
	}
}