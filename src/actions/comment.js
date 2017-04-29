/* 获取视频评论 */
export const QUERYCOMMENTLISTING = 'QUERYCOMMENTLISTING'
export const QUERYCOMMENTLISTEND = 'QUERYCOMMENTLISTEND'
export const QUERYCOMMENTLISTERROR = 'QUERYCOMMENTLISTERROR'

function queryCommentListIng() {
	return {
		type: QUERYCOMMENTLISTING
	}
}
function queryCommentListEnd({list, videoId}) {
	return {
		type: QUERYCOMMENTLISTEND,
		list,
		videoId
	}
}
function queryCommentListError(err) {
	return {
		type: QUERYCOMMENTLISTERROR,
		err
	}
}
export const queryCommentList = (videoId) => {
	return (dispatch, getState) => {
		dispatch(queryCommentListIng());
		videoHttpServer.queryCommentList(type)
			.then( list => dispatch(queryCommentListEnd({list, videoId})))
			.catch( err => dispatch(queryCommentListError(err)))
	}
}