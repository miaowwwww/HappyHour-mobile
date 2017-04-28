// import Immutable from 'immutable';
import { USER_REQUESTING, USER_REQUESTSUCCESS, USER_REQUESTERROR, USER_SYNCLOGIN } from '../actions/user.js';

const initialState = {};

export default function user( state = initialState, action){
	switch(action.type) {
		// case USER_REQUESTING:
		// 	return state.merge({isLogining: true, requestErrorMsg: '', loginErrorMsg: ''});
		// case USER_REQUESTSUCCESS:
		// 	return state.merge({isLogining: false, ...action.user});
		// case USER_REQUESTERROR:
		// 	return state.merge({isLogining: false, requestErrorMsg: action.requestErrorMsg});
		case USER_SYNCLOGIN:
			return action.user;
		default:
			return state;
	}
}