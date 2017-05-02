import { 
	USER_REQUESTING,
	USER_REQUESTSUCCESS,
	USER_REQUESTERROR,
	USER_SYNCLOGIN, 
	USER_UPDATE,
	USER_UPDATEPASSWORD,
	USER_LOGOUT
} from '../actions/user.js';

const initialState = {

};

export default function user(state = initialState, action) {
	switch (action.type) {
		/* 通过异步action 触发 */
		case USER_REQUESTING:
			return {...state, isLogining: true, requestErrorMsg: '', loginErrorMsg: ''};
		case USER_REQUESTSUCCESS:
			return {...state, isLogining: false, ...action.user};
		case USER_REQUESTERROR:
			return {...state, isLogining: false, requestErrorMsg: action.requestErrorMsg};
		/* 通过同步action 来触发 */
		case USER_SYNCLOGIN:
			return {...state, ...action.user};
		/* 更新用户 */
		case USER_UPDATE:
			return {...state, ...action.user};
		/* 修改密码 */
		case USER_UPDATEPASSWORD:
			return {...state, _id: action._id}
		/* 登出 */
		case USER_LOGOUT:
			return initialState
		default:
			return state;
	}
}