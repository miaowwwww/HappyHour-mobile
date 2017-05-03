import {
	PERSON_FETCHBYID,
	PERSON_FOLLOW,
} from '../actions/person.js';

const initialState = {
	/*
	 * [personid]: {
	 * 	isUser,
	 * 	isFollow
	 * }
	 * */
}
export default function person (state = initialState, action) {
	switch( action.type ) {
		/* 通过id获取用户信息 */
		case PERSON_FETCHBYID: 
			return {
				...state,
				[action.person._id]: action.person
			};
		/* 关注、取消关注 */
		case PERSON_FOLLOW:
			return {
				...state,
				[action.personId]: {
					...state[action.personId],
					isFollow: !state[action.personId].isFollow
				}
			}
		default: 
			return state;
	}
}