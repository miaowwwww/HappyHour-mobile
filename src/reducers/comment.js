import { 
	QUERYCOMMENTLISTING,
	QUERYCOMMENTLISTEND,
	QUERYCOMMENTLISTERROR
 } from '../actions/comment.js';

const initialState = {

};

export default function user( state = initialState, action){
	switch(action.type) {
		case QUERYCOMMENTLISTING:
			return {...state, isFetching: true};

		case QUERYCOMMENTLISTEND:
			return {
				...state,
				isFetching: false,
				lastFecthingTime: new Date(),
				list: state.list.concat(action.list)
			};

		case QUERYCOMMENTLISTERROR:
			return {...state, requestErrorMsg: '网络 错误', isFetching: false};

		default:
			return state;
	}
}