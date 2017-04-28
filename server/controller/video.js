const fs = require('fs');
const VideoModel = require('../model/video.js');
const path = require('path');
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
*/

/* 获取列表 */
exports.queryList = async (ctx) => {
	console.log(ctx.query)
	let {pn, sort} = ctx.query;
	let videos = await VideoModel.queryList({pn: pn - 1, size: 10});
	console.log(videos)
	ctx.body = videos;
}

/* 保存 */
exports.save = async (ctx) => {
	console.log(ctx.session.user);
	let user = ctx.session.user;
	if(!user || !user._id) {
		user = {_id: '58f6e27cd768e226481aa756'}
	}
	if(!user._id) { 
		return ctx.body = { err: '无法获取用户信息,请重新登录'} 
	}
	let video = await VideoModel.saveVideo({user: user._id, ...ctx.req.body});
	console.log(video);
	return ctx.body = {success: 'ok'};
}

/* 上传海报 */
exports.uploadPoster = async (ctx, next) => {
	console.log(ctx.session.user)
	let posterFile = ctx.req.files.find((file) => file.fieldname === 'poster');
	/* 没有海报 */
	if (!posterFile) { 
		return next(); 
	}
	/* 处理海报 */
	let filePath = posterFile.path;
	let originalname = posterFile.originalname;
	/* 读取上传的海报 */
	let data = await readFilePromise(filePath);
	let timestamp = Date.now()
	let type = posterFile.originalname.split('.')[1]
	let poster = timestamp + '.' + type
	let newPath = path.join(__dirname, '../../', '/upload/poster/' + poster)
	/* 新的海报，新的地址 */
	await writeFilePromise(newPath, data);
	ctx.req.body.poster = poster
	await next()
}

/* 上传视频 */
exports.uploadVideo = async (ctx, next) => {
	let videoFile = ctx.req.files.find(file => file.fieldname === 'flash');
	/* 没有视频 */
	if (!videoFile) { 
		return ctx.body = {err: '视频上传出错'}; 
	}
	/* 处理视频 */
	let filePath = videoFile.path;
	let originalname = videoFile.originalname;
	/* 获取暂存区的视频 */
	let data = await readFilePromise(filePath);
	let timestamp = Date.now()
	let type = videoFile.originalname.split('.')[1]
	let flash = timestamp + '.' + type
	let newPath = path.join(__dirname, '../../', '/upload/video/' + flash)
	/* 保存到新地址 */
	await writeFilePromise(newPath, data);
	ctx.req.body.flash = flash;
	await next();
}

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
const writeFilePromise = (newPath, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(newPath, data, function (err) {
			resolve();
		})
	})
}