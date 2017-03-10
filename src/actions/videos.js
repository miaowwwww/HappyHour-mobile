export const VIDEO_REQUESTPOST = 'VIDEO_REQUESTPOST';
export const VIDEO_REQUESTSUCCESS = 'VIDEO_REQUESTSUCCESS';
export const VIDEO_REQUESTERROR = 'VIDEO_REQUESTERROR';

// 模拟数据
import video from '../vdata/video.json';

function requestPost(VIDEO) {
	return {
		type: VIDEO_REQUESTPOST
	}
}

// 后台将返回这个字符串loginErrorMsg: '账号密码错误'
function requestSuccess(json) {
	return {
		type: VIDEO_REQUESTSUCCESS,
		videos: json
	}
}

function requestError(err) {
	return {
		type: VIDEO_REQUESTERROR,
		requestErrorMsg: '网络错误'
	}
}

export function getList(){
	return (dispatch, getState) => {
		dispatch(requestPost());
		// 发送请求
		setTimeout(function() {
			dispatch(requestSuccess(video));
			// dispatch(requestError());
		},2000)

	}

}

