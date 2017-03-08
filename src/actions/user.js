export const USER_REQUESTNING = 'USER_REQUESTING';
export const USER_REQUESTSUCCESS = 'USER_REQUESTSUCCESS';
export const USER_REQUESTERROR = 'USER_REQUESTERROR';

export const login = (user) => {
	return function(dispatch, getState) {
		dispatch(requestPost(user));
		fetch('/user.json', { type: 'POST', body: user})
			.then(response => response.json())
			.then(json => dispatch(receivePost(json)))
			.catch(err => dispatch(requestError(err)))
	}

}
function requestPost(user) {
	return {
		type: USER_LOGINING,
		isLogining: true,
		requestErrorMsg: ''
	}
}

// 后台将返回这个字符串loginErrorMsg: '账号密码错误'
function requestSuccess(json) {
	return {
		type: USER_LOGINSUCCESS,
		user: json
	}
}

function requestError(err) {
	return {
		type: USER_LOGINERROR,
		requestErrorMsg: '网络错误'
	}
}