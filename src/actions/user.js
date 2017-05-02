export const USER_REQUESTING = 'USER_REQUESTING';	// 发送请求
export const USER_REQUESTSUCCESS = 'USER_REQUESTSUCCESS'; // 请求成功
export const USER_REQUESTERROR = 'USER_REQUESTERROR'; // 请求失败
export const USER_SYNCLOGIN = 'USER_SYNCLOGIN'; //同步方式登录
// 若需要修改路由，可通过react-router-redux，此处暂时将history引入
import defineHistory from '../store/history.js';
import { userHttpServer } from '../api/HttpServer.js';
import Toast from '../components/Toast.js';

function requestPost(user) {
	return {
		type: USER_REQUESTING
	}
}

// 后台将返回这个字符串loginErrorMsg: '账号密码错误'
function requestSuccess(json) {
	return {
		type: USER_REQUESTSUCCESS,
		user: json
	}
}

function requestError(err) {
	return {
		type: USER_REQUESTERROR,
		requestErrorMsg: '网络错误'
	}
}

/* 1.异步登录 action */
function requestLogining(user) {
	return {
		type: USER_REQUESTING
	}
}
function requestLogined(user) {
	return {
		type: USER_REQUESTSUCCESS,
		user: user
	}
}

function requestLoginError(err) {
	return {
		type: USER_REQUESTERROR,
		requestErrorMsg: err
	}
}
export const asyncLogin = ( user ) => {
	return function ( dispatch, getState ) {
		dispatch( requestLogining() );

		userHttpServer.login( user )
			.then( user => {
				dispatch( requestLogined( user ) );
				// defineHistory.goBack();
			} )
			.catch( err => dispatch( requestLoginError( err )))
	}
}

/* 2.通过LoginModel 同步登陆 */
export const syncLogin = (user) => {
	return {
		type: USER_SYNCLOGIN,
		user
	}
}


/* 3.更新user */
export const USER_UPDATE = 'user_update'
export const updateUser = (user) => {
	return {
		type: USER_UPDATE,
		user
	}
}

/* 4.修改密码 */
export const USER_UPDATEPASSWORD = 'USER_UPDATEPASSWORD';
const updatePasswordEnd = (_id) => {
	return {
		type: USER_UPDATEPASSWORD,
		_id
	}
}
/* user:{_id, oldpwd, newpwd } */
export const updatePassword = (user) => {
	return (dispatch, getState) => {
		userHttpServer.updatePassword(user)
			.then(ok => {
				dispatch(updatePasswordEnd(user._id));
				defineHistory.goBack();
			})
			.catch(err => Toast.show({text:err, time:500}))
	}
}

/* 5.退出登录 */
export const USER_LOGOUT = 'USER_LOGOUT';
/* user: {_id} */
export const logout = (user) => (dispatch, getState) => {
	userHttpServer.logout(user._id)
		.then(ok => {
			dispatch(userLogout())
			defineHistory.replace('/my');
		})
		.catch(err => {
			console.log(err);
			Toast.show({text: err, time: 500})
		})
}

function userLogout() {
	return {
		type: USER_LOGOUT
	}
}