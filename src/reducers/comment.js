import {
	QUERYCOMMENTLISTING,
	QUERYCOMMENTLISTEND,
	QUERYCOMMENTLISTERROR
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

		default:
			return state;
	}
}