const imgpath = '/images';
const utils = {};

utils.img = (name) => {
	return `/images/${name}`;
}

utils.poster = (name) => {
	return name && `/poster/${name}`
}

utils.header = (name) => {
	return name && `/header/${name}`
}

utils.video = (name) => {
	return name && `/video/${name}`
}

utils.typeof = (param) => {
	let _str = Object.prototype.toString.call(param);
	_str = _str.slice(8, -1);
	return _str;
}

utils.reg = {
	email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
	mobile: /^0?1[3|4|5|8][0-9]\d{8}$/,
	int: /^[-]?([0-9]+\d*)$/,
	positiveInt: /^([1-9]+\d*)$/,
	number: /^(-?\d+)(\.\d+)?$/,
	date: /^(\d{4})-(\d{2})-(\d{2})$/,
	datetime: /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/,
	idCardNo: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
}

utils.xhrUpload = (url, formName, config) => {
	return new Promise((resolve, reject) => {
		//0.预处理
		let xhr = new window.XMLHttpRequest(),
			form = document.forms.namedItem(formName);
		let formData = new window.FormData(form);
		// Append file data:
		// formData.append(key, file, file.name);


		//1.设置各类回调函数
		// Triggered when upload starts:
		xhr.upload.onloadstart = function () {
		};

		// Triggered many times during upload:
		xhr.upload.onprogress = function (ev) {
			// console.log(ev.loaded/ev.total*100 + '%')
		};

		// Triggered when upload is completed:
		xhr.onload = function (e) {
			let resObj = JSON.parse(`${xhr.responseText}`);
			resolve(resObj)
		};

		// Triggered when upload fails:
		xhr.onerror = function (ev) {
			console.log('err')
		};

		/**异步状态判断 */
		// xhr.onreadystatechange = () => {

		// 	let readyState = xhr.readyState;
		// 	let status = `${xhr.status}`;

		// 	if (readyState === 4) {
		// 		if (status.indexOf('2') === 0 || status.indexOf('3') === 0) {
		// 			let resObj = {};
		// 			try {
		// 				console.log(xhr)
		// 				// resObj = JSON.parse(`${xhr.responseText}`);
		// 				// console.log(resObj)
		// 				// config.success(resObj);
		// 			} catch (e) {
		// 				// config.error(e);
		// 				// config.complete();
		// 			}

		// 			/**客户端、服务端错误 */
		// 		} else if (status.indexOf('4') === 0 || status.indexOf('0') === 0 || status.indexOf('5') === 0) {
		// 			// config.error(status);
		// 			// config.complete();
		// 		} else {
		// 			config.error(status)
		// 			config.complete();
		// 		}

		// 	}
		// }

		xhr.open('POST', url);

		//2.开始上传文件了
		xhr.send(formData);

	})
}

utils.updateUserInfo = function (formName) {
	return utils.xhrUpload('/api/user/update', formName);
}
utils.uploadVideo = function (formName) {
	return utils.xhrUpload('/api/video/upload', formName);
}

utils.getFileData = function(fil) {
	return new Promise ( (resolve, reject) => {
    let reader = new FileReader();
    reader.onload = function(e) {
		let result = event.target.result; //返回的dataURL  
            console.log('result')
            console.log(result)
		resolve(result)
    }
    reader.readAsDataURL(fil);
	})
}



export default utils;
