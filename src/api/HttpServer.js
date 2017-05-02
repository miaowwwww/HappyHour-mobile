import utils from './utils.js';

const DATABASE = '/api';

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
	request = (Uri, method, body, rest) => {
		let headers = new Headers({'Content-Type' : 'application/json'});
		body = JSON.stringify(body);
		// const req = new Request(_getUri(Uri), {method, body, headers, ...rest});
		return fetch(this.getUri(Uri), {credentials: 'include', method, headers, body, ...rest})
			.then(res => {
				return res.json();
			})
			.then(result => {
				console.log(result)
				return result.err && Promise.reject(result.err) || Promise.resolve(result);
			})
	}

	/* 以id 获取单例 */
	get = (params) => {
		return this.request(params, 'GET')
	}

	/* 添加尾地址，和postdata */
	post = (params, data) => {
		return this.request(params, 'POST', data)
	}
}

/*用户user模块*/
class UserHttpServer extends HttpServer {
	constructor(apiBaseUri){
		super(apiBaseUri);
	}
	
	/*注册*/
	regist = (newUser) => {
		return this.post('regist', newUser);
	}
	/*更新*/
	update = (user) => {
		return this.post('update', user)
	}
	/* 修改密码 {_id, oldpwd, newpwd} */
	updatePassword = (user) => {
		return this.post('update/password', user);
	}
	/*登录*/
	login = (AccountPwd) => {
		return this.post('login', AccountPwd);
	}
	/* 退出登录 */
	logout = (userId) => {
		return this.get(`logout/${userId}`);
	}
}
/* video模块 */
class VideoHttpServer extends HttpServer {
	constructor(apiBaseUri){
		super(apiBaseUri);
	}
	
	/* 获取列表 */
	queryVideos = (type) => {
		return this.get({uri: 'list', ...type});
	}
	/* 获取视频评论 id*/
	queryCommentList = ({videoId, pn}) => {
		return this.get(`${videoId}/comment?pn=${pn}`);
	}
	/* 评论视频 */
	commentVideo = (data) => {
		return this.post('comment', data);
	}
}

export const userHttpServer = new UserHttpServer('user');
export const videoHttpServer = new VideoHttpServer('video');
