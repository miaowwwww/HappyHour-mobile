const fs = require('fs');

/* 读取文件async */
const readFilePromise = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, function (err, data) {
			err && reject(err);
			resolve(data);
		})
	})
}

/* 写入文件async */
const writeFilePromise = (path, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, function (err) {
			resolve();
		})
	})
}

/* 上传文件 img: png, video: mp4 */
const uploadFile = async (file, dirpath, type) => {

	let fileCachePath = file.path;

	/* 读取临时文件 */
	let data = await readFilePromise(fileCachePath);
	let timestamp = Date.now();
	// let type = posterFile.originalname.split('.')[1];
	// let poster = timestamp + '.' + type;
	let imageName = `${timestamp}.${type}`;//写死png格式
	let newPath = `${dirpath}/${imageName}`;
	
	/* 写入文件 */
	await writeFilePromise(newPath, data);

	return imageName;
}

module.exports = {readFilePromise, writeFilePromise, uploadFile}