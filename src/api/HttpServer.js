import utils from './utils.js';

const DATABASE = '/api';
let HttpServerToken = '';
export const setToken = (token) => {
	HttpServerToken = token;
}
export const getToken = () => {
	return HttpServerToken;
}
export const clearToken = () => {
	return HttpServerToken = '';
}
/* 请求服务 */
class HttpServer {
	constructor(apiBaseUri) {
		this.apiBaseUri = apiBaseUri;
	}

	/* 
	 * 拼接uri 
	 * params={
	 * 	uri: 拼接uri
	 * 	rest1: xxx1,
	 * 	rest2: xxx2
	 * }
	 * return `${apiBaseUri}/${uri}?rest1=xxx1&rest2=xxx2
	 */

	getUri = (param) => {
		if(typeof(param) != 'object') {
			return `${DATABASE}/${this.apiBaseUri}/${param}`;
		}
		// 如果是object或者array就说明要组合 ?foo&bar;
		let url;
		if(param.uri) {
			url = `${DATABASE}/${this.apiBaseUri}/${param.uri}?`
			delete param.uri;
		}else {
			url = `${DATABASE}/${this.apiBaseUri}?`
		}
		Object.keys(param).map(key => {
			url += `${key}=${param[key]}&`
		})
		return url.substring(0, url.length - 1);
	}
	
	/* 发送请求 */
	request = ({Uri, method, body, withToken}) => {
		let headers = new Headers({'Content-Type' : 'application/json'});
		/* 添加token 后期应该添加参数，只有某些请求添加token*/
		if(withToken) {
			headers.set("x-access-token", HttpServerToken);
		}
		body = JSON.stringify(body);
		// const req = new Request(_getUri(Uri), {method, body, headers});
		return fetch(this.getUri(Uri), {credentials: 'include', method, headers, body})
			.then(res => {
				return res.json();
			})
			.then(result => {
				return result.err && Promise.reject(result.err) || Promise.resolve(result);
			})
			.catch(err => {
				return Promise.reject(err.toString())
			})
	}

	/* 以id 获取单例 */
	get = (params, withToken) => {
		return this.request({
			Uri: params, 
			method: 'GET',
			withToken
		})
	}

	/* 添加尾地址，和postdata */
	post = (params, data, withToken) => {
		return this.request({
			Uri: params, 
			method: 'POST', 
			body: data,
			withToken
		})
	}

}

/*用户user模块*/
class UserHttpServer extends HttpServer {
	/*注册*/
	regist = (newUser) => {
		return this.post('regist', newUser, false);
	}
	/*登录*/
	login = (AccountPwd) => {
		return this.post('login', AccountPwd, false);
	}
	/* 退出登录 */
	logout = (userId) => {
		return this.get(`logout/${userId}`, true);
	}
	/*更新*/
	update = (user) => {
		return this.post('update', user, true)
	}
	/* 修改密码 {_id, oldpwd, newpwd} */
	updatePassword = (user) => {
		return this.post('update/password', user, true);
	}
	/* 根据id 获取用户 */
	personFetchById = (id) => {
		return this.get(`fetchOne/${id}`, false);
	}
	/* 关注用户 userid，personid*/
	personFollow = (userId, personId) => {
		return this.get(`follow?user=${userId}&person=${personId}`, true);
	}
	/* 搜索用户 key */
	search = (keyword, pn = 1) => {
		return this.get(`search?keyword=${keyword}&pn=${pn}`)
	}
}
/* video模块 */
class VideoHttpServer extends HttpServer {
	/* 获取列表 */
	queryVideos = (opt) => {
		return this.get({uri: 'list', ...opt});
	}
	/* 获取关注的用户的视频列表?userId&pn */
	queryFollowVideos = (userId, pn) => {
		return this.get({uri: 'followlist', userId, pn}, true)
	}
	/* 获取某用户的视频列表 {id, pn}*/
	queryPersonVideo = (opt) => {
		return this.get({uri: 'person', ...opt})
	}
	/* 根据id 获取特定的video*/
	getVideo = (id) => {
		return this.get(`fetchOne/${id}`);
	}
	/* 获取视频评论 id*/
	queryCommentList = ({videoId, pn}) => {
		return this.get(`${videoId}/comment?pn=${pn}`);
	}
	/* 评论视频 */
	commentVideo = (data) => {
		return this.post('comment', data, true);
	}
	/* 搜索视频 */
	search = (keyword, pn = 1) => {
		return this.get(`search?keyword=${keyword}&pn=${pn}`)
	}
	/* 点赞视频 */
	goodVideo = (videoId, userId) => {
		return this.get(`good?video=${videoId}&user=${userId}`, true)
	}
}

export const userHttpServer = new UserHttpServer('user');
export const videoHttpServer = new VideoHttpServer('video');



