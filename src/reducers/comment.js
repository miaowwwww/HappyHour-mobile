import {
	QUERYCOMMENTLISTING,
	QUERYCOMMENTLISTEND,
	QUERYCOMMENTLISTERROR,
	COMMENT_ADDBEGIN,
	COMMENT_ADDEND,
	COMMENT_ADDERROR,
	COMMENT_DELETE,
} from '../actions/comment.js';

const initialState = {
	/*
	 * videoId: {
	 * 	list: [comment],
	 *  	isFetching: false,
	 * 	lastFecthingTime: Date,
	 * 	nomore: false
	 * } 
	 * 
	 */
};

export default function comment(state = initialState, action) {
	const { videoId, commentId, list, type, nomore } = action;
	switch (action.type) {
		case QUERYCOMMENTLISTING:
			return {
				...state,
				[videoId]: { list: [], ...state[videoId], isFetching: true }
			};
		case QUERYCOMMENTLISTEND:
	console.log(action)
	console.log(videoId)
			return {
				...state,
				[videoId]: {
					nomore,
					isFetching: false,
					lastFecthingTime: new Date(),
					list: [...list, ...state[videoId].list]
				}
			};
		case QUERYCOMMENTLISTERROR:
			return {
				...state,
				[videoId]: {
					requestErrorMsg: '网络 错误',
					isFetching: false
				}
			};
		/* 
		 *	评论视频,都是id
		 *	action: {type, comment: {video, from, to...}}	
		 *
		 * */
		case COMMENT_ADDBEGIN:
			return state;
		case COMMENT_ADDEND:
			const { video } = action.comment;
			return {
				...state,
				[video]: { 
					...state[video],
					list: [action.comment, ...state[video].list] 
				}
			}
		case COMMENT_ADDERROR:
			return state;
		/* 删除评论：用户删除 commentId, videoId */
		case COMMENT_DELETE:
			return {
				...state,
				[videoId]: {
					...state[videoId],
					list: state[videoId].list.filter(item => item._id != commentId)
				}
			}
		default:
			return state;
	}
}