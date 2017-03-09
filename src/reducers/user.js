import Immutable from 'immutable';
import { USER_REQUESTING, USER_REQUESTSUCCESS, USER_REQUESTERROR  } from '../actions/user.js';

const initialState = Immutable.Map({
	isLogining: false,
	name: '',
	sex: 'man',
	birthday: '0509',
	accessToken: '',
	requestErrorMsg: '',
	loginErrorMsg: ''
});

export default function user( state = initialState, action){
	switch(action.type) {
		case USER_REQUESTING:
			return state.merge({isLogining: true, requestErrorMsg: '', loginErrorMsg: ''});
		case USER_REQUESTSUCCESS:
			return state.merge({isLogining: false, ...action.user});
		case USER_REQUESTERROR:
			return state.merge({isLogining: false, requestErrorMsg: action.requestErrorMsg});
		default:
			return state;
	}
}