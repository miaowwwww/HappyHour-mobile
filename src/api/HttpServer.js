import utils from './utils.js';

const DATABASE = '/api';

/* 请求服务 */
class HttpServer {
	constructor(apiBaseUri) {
		this.apiBaseUri = apiBaseUri;
	}

	/* 拼接uri */
	getUri = (param) => {
		if(typeof(param) != 'object') {
			return `${DATABASE}/${this.apiBaseUri}/${param}`;
		}
		// 如果是object或者array就说明要组合 ?foo&bar;
	}
	
	/* 发送请求 */
	request = (Uri, method, body, rest) => {
		let headers = new Headers({'Content-Type' : 'application/json'});
		body = JSON.stringify(body);
		// const req = new Request(_getUri(Uri), {method, body, headers, ...rest});
		return fetch(this.getUri(Uri), {method, headers, body, ...rest})
			.then(res => {
				return res.json();
			})
			.then(result => {
				return result.err && Promise.reject(result.err) || Promise.resolve(result);
			})
	}

	/* 以id 获取单例 */
	get = (id) => {
		return this.request(id, 'GET')
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
		return this.post(`update`, user)
	}
	/*登录*/
	login = (AccountPwd) => {
		return this.post('login', AccountPwd);
	}
}
export const userHttpServer = new UserHttpServer('user');
