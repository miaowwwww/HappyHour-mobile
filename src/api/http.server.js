class HttpServer {

	TIMEOUT = 3000

	get getXHR() {
		return new XMLHttpRequest();
	}

	/*
	 * config: {error, complete, success, progress}
	*/

	post(url, data, config) {
		let xhr = this.getXHR;
		this.decorateXHR(xhr, config);
		xhr.open( 'POST', `${url}`, true );
		xhr.setRequestHeader("Content-type","application/json");
		xhr.send(JSON.stringify( data ));
	}

	get(url, data, config) {

	}

	decorateXHR(xhr, config) {

		/**异步错误获取 */
		xhr.onerror = err => {
			config.error(err);
		}

		/**超时设置 */
		xhr.timeout = this.TIMEOUT;
		xhr.ontimeout = ($event) => {
			config.error('http请求超时');
			this.closeConnection(xhr, config)
		}

		/* 监听进程 */
		// xhr.onprogress = (e) => {
			// config.progress(e);
		// }
		xhr.onprogress = config.progress

		xhr.onload = (a, b) => {
			console.log(`onload-${a}-${b}`)
		}
		xhr.onloadstart = (a, b) => {
			console.log(`onloadstart-${a}-${b}`)
		}
		xhr.onloadend = (a, b) => {
			console.log(`onloadend-${a}-${b}`)
		}

		/**异步状态判断 */
		xhr.onreadystatechange = () => {

			/**变量声明 */
			let readyState = xhr.readyState;
			let status = `${xhr.status}`;

			/**准备就绪 */
			if (readyState === 4) {
				/**成功：2**、3** */
				if (status.indexOf('2') === 0 || status.indexOf('3') === 0) {
					let resObj = {};
					try {
						resObj = JSON.parse(`${xhr.responseText}`);
						config.success(resObj);
					} catch (e) {
						config.error(e);
						config.complete();
					}

					/**客户端、服务端错误 */
				} else if (status.indexOf('4') === 0 || status.indexOf('0') === 0 || status.indexOf('5') === 0) {
					config.error(status);
					config.complete();
				} else {
					config.error(status)
					config.complete();
				}

			}
		}

	}

	closeConnection(xhr, config) {
		xhr.abort();
		config.complete();
	}

	setGetUrlWithQuery(url, query) {
		url += '?';
		Object.keys(query).map(key => {
			url += `${key}=${query[key]}&`
		})
		return url.substring(0, url.length - 1);
	}

	turnObjToQuery(query) {
		if (!query) return '';
		let body = '';
		Object.keys(query).map(key => {
			body += `${key}=${query[key]}&`
		})
		return body;
	}

}

export default new HttpServer();
// window.HTTPServer = new HttpServer();


// HTTPServer.post('/api/video/upload', {a: 'aa'}, {
// 	error: err => console.log('config.error'),
// 	success: su => console.log('config.success'),
// 	complete: () => console.log('config.complete')
// })