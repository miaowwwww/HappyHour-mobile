export const USER_REQUESTING = 'USER_REQUESTING';	// 发送请求
export const USER_REQUESTSUCCESS = 'USER_REQUESTSUCCESS'; // 请求成功
export const USER_REQUESTERROR = 'USER_REQUESTERROR'; // 请求失败
export const USER_SYNCLOGIN = 'USER_SYNCLOGIN'; //同步方式登录
// 若需要修改路由，可通过react-router-redux，此处暂时将history引入
import defineHistory from '../history';
import { userHttpServer } from '../api/HttpServer.js';

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

/* 登录 action */
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
				defineHistory.goBack();
			} )
			.catch( err => dispatch( requestLoginError( err )))
	}
}
export const syncLogin = ( user ) => {
	return {
		type: USER_SYNCLOGIN,
		user
	}
}