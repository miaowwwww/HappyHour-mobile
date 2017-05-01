import { USER_SYNCLOGIN, USER_UPDATE } from '../actions/user.js';

const initialState = {
	_id: "58f6e27cd768e226481aa756",
	account: "123",
	email: "123",
	name: '123',
	followCount: 0,
	header:	"1493573287449.png"
};

export default function user(state = initialState, action) {
	switch (action.type) {
		// case USER_REQUESTING:
		// 	return state.merge({isLogining: true, requestErrorMsg: '', loginErrorMsg: ''});
		// case USER_REQUESTSUCCESS:
		// 	return state.merge({isLogining: false, ...action.user});
		// case USER_REQUESTERROR:
		// 	return state.merge({isLogining: false, requestErrorMsg: action.requestErrorMsg});
		case USER_SYNCLOGIN:
			return {...state, ...action.user};
		case USER_UPDATE:
			console.log(action)
			return {...state, ...action.user};

		default:
			return state;
	}
}