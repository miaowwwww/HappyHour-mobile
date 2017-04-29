function xhrUpload(file, url, data, headers, fileLength, defer) {
	var xhr = new window.XMLHttpRequest(),
		formData = new window.FormData(),
		key = 'file';
	formData.append(key, file, file.name);

	if (data && data.withCredentials === true) {
		xhr.withCredentials = true;
	}
	xhr.open('POST', url);
	xhr.send(formData);
}

export default function upload(fileEle, fileUrl, data, headers) {
	fileSend = 0;
	result = [];
	var defer = $q.defer();
	if (window.FormData) {
		$timeout(function () {
			angular.forEach(fileEle.files, function (file) {
				xhrUpload(file, fileUrl, data, headers, fileEle.files.length, defer);
			})
		}, 16)
		return defer.promise;
	} else {
		console.log('旧版浏览器')
	}
}