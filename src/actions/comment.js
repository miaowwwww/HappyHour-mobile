/* 获取视频评论 */
export const QUERYCOMMENTLISTING = 'QUERYCOMMENTLISTING'
export const QUERYCOMMENTLISTEND = 'QUERYCOMMENTLISTEND'
export const QUERYCOMMENTLISTERROR = 'QUERYCOMMENTLISTERROR'

import { videoHttpServer } from '../api/HttpServer.js';

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