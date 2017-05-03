const fs = require('fs');
const VideoModel = require('../model/video.js');
const UserModel = require('../model/user.js');
const path = require('path');
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
*/

/* 获取列表 */
const size = 100;
exports.queryList = async (ctx) => {
	let { pn, sort } = ctx.query;
	let videos = await VideoModel.queryList({ pn: pn - 1, size });
	ctx.body = videos;
}
/* 获取某用户的视频列表 */
exports.queryPersonVideo = async (ctx) => {
	const { id, pn } = ctx.query;
	let videos = await VideoModel.queryList({ pn: pn - 1, size, select: { user: id } })
	if (!videos) { return ctx.body = { err: '查找用户视频错误' } };
	ctx.body = { videos };
}


/* 保存视频 不仅要保存，同时应该在user信息中，添加videos */
exports.save = async (ctx) => {
	let user = ctx.session.user;
	let video = await VideoModel.saveVideo({ user: user._id, ...ctx.req.body });
	console.log(user._id);
	console.log(video._id);
	await UserModel.update(
		{ _id: user._id },
		{ $push: { videos: video._id } },
		(err, user) => {
			console.log(user);
			console.log(err)
		}
	);
	return ctx.body = { success: 'ok' };
}

/* 上传海报 */
exports.uploadPoster = async (ctx, next) => {
	let posterFile = ctx.req.files.find((file) => file.fieldname === 'poster');
	/* 没有海报 */
	if (!posterFile) { return next(); }

	let poster = await tool.uploadFile(posterFile, 'upload/poster', 'png');

	ctx.req.body.poster = poster
	await next()
}

/* 上传视频 */
exports.uploadVideo = async (ctx, next) => {
	// 确认是否登录
	let user = ctx.session.user || {};
	if (!user._id) {
		return ctx.body = { err: '无法获取用户信息,请重新登录' }
	}

	let videoFile = ctx.req.files.find(file => file.fieldname === 'flash');
	/* 没有视频 */
	if (!videoFile) {
		return ctx.body = { err: '视频上传出错' };
	}

	let flash = await tool.uploadFile(videoFile, 'upload/video', 'mp4');

	ctx.req.body.flash = flash;
	await next();
}

