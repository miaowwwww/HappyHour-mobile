import {
	QUERYCOMMENTLISTING,
	QUERYCOMMENTLISTEND,
	QUERYCOMMENTLISTERROR,
	COMMENT_ADDBEGIN,
	COMMENT_ADDEND,
	COMMENT_ADDERROR
} from '../actions/comment.js';

const initialState = {
	/*
	 * videoId: {
	 * 	list: [comment],
	 *  isFetching: false,
	 * 	lastFecthingTime: Date
	 * } 
	 * 
	 */
};

export default function comment(state = initialState, action) {
	const { videoId, list, type, nomore } = action;
	switch (action.type) {
		case QUERYCOMMENTLISTING:
			return {
				...state,
				[videoId]: { list: [], ...state[videoId], isFetching: true }
			};
		case QUERYCOMMENTLISTEND:
			return {
				...state,
				[videoId]: {
					nomore,
					isFetching: false,
					lastFecthingTime: new Date(),
					list: state[videoId].list.concat(list)
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
				[video]: { list: [action.comment, ...state[video].list] }
			}
		case COMMENT_ADDERROR:
			return state;
		default:
			return state;
	}
}