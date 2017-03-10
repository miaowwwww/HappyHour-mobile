export const USER_REQUESTING = 'USER_REQUESTING';
export const USER_REQUESTSUCCESS = 'USER_REQUESTSUCCESS';
export const USER_REQUESTERROR = 'USER_REQUESTERROR';
// 若需要修改路由，可通过react-router-redux，此处暂时将history引入
import { browserHistory } from 'react-router';

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

export const login = (user) => {
	return function (dispatch, getState) {
		dispatch(requestPost(user));
		setTimeout(function () {
			// 模拟请求,当然为false
			const user = {
				"name": "miaowwwww",
				"sex": "girl",
				"birthday": "0928",
				// "loginErrorMsg": "账号密码不正确",
				"accessToken": "itisaccessToken"
			};
			if(user.loginErrorMsg) {
				dispatch(requestSuccess(user));
			}else {
				browserHistory.goBack();
			}
			dispatch(requestSuccess(user))
			// fetch('/user.json', { type: 'POST', body: user})
			// 	.then(response => response.json())
			// 	.then(json => dispatch(receivePost(json)))
			// 	.catch(err => dispatch(requestError(err)))
		}, 2000)
	}

}