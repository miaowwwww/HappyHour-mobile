const fs = require('fs');
const VideoModel = require('../model/video.js');
const UserModel = require('../model/user.js');
const path = require('path');
const tool = require('./tool.js');
/*
* 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
*/

/* 获取列表 */
const size = 100;
exports.queryList = async (ctx) => {
	let { pn, type, key } = ctx.query;
	/* type: select | search 。 关注follow另起一个，需要登录 */

	let videos = await VideoModel.queryList({ pn: pn - 1, size, select: { status: 1 } });
	ctx.body = videos;
}


/* 获取某用户的视频列表 */
exports.queryPersonVideo = async (ctx) => {
	const { id, pn } = ctx.query;
	let videos = await VideoModel.queryList({ pn: pn - 1, size, select: { user: id, status: 1 } })
	if (!videos) { return ctx.body = { err: '查找用户视频错误' } };
	ctx.body = { videos };
}

/* 保存视频 不仅要保存，同时应该在user信息中，添加videos */
exports.save = async (ctx) => {
	const { userId } = ctx.token;
	let video = await VideoModel.saveVideo({ user: userId, ...ctx.req.body });
	await UserModel.update(
		{ _id: userId },
		{ $push: { videos: video._id } }
	);
	return ctx.body = { ok: '上传成功' };
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

	let videoFile = ctx.req.files.find(file => file.fieldname === 'flash');
	/* 没有视频 */
	if (!videoFile) {
		return ctx.body = { err: '视频上传出错' };
	}

	let flash = await tool.uploadFile(videoFile, 'upload/video', 'mp4');

	ctx.req.body.flash = flash;
	await next();
}

/* 获取所有关注的人的视频 */
exports.followList = async (ctx) => {
	const token_userId = ctx.token.userId;
	const { userId, pn } = ctx.query;
	if (token_userId !== userId) { return ctx.body = { err: '用户信息不匹配,请重新登录' } };

	let user = await UserModel.findById(userId);
	if (!user) { return ctx.body = { err: '找不到当前用户' } }

	let videos = await VideoModel.find({ user: user.starUser, status: 1 })
		.populate('user', 'name _id header')
		.sort({ createAt: -1 })

	ctx.body = { videos }

}

/* 搜索视频keyword&pn */
exports.search = async (ctx) => {
	const { keyword, pn } = ctx.query;
	const size = 100;
	let reg = new RegExp(keyword, 'gi');
	let videos = await VideoModel.find({ title: reg, status: 1 })
		// .sort({followCount: -1})
		.skip((pn - 1) * size)
		.limit(size);
	return ctx.body = { videos }
}

/* 通过id获取特定的视频 */
exports.getVideo = async (ctx) => {
	const { id } = ctx.params;
	let video = await VideoModel.findById(id).populate('user', 'name _id header');

	if (!video) { return ctx.body = { err: '找不到视频' } };
	return ctx.body = { video }
}

/* 为视频点赞 user&video */
exports.goodVideo = async (ctx) => {
	const { userId, videoId } = ctx.query;
	let user = await UserModel.findById(userId);
	if (!user) { return { err: '找不到当前用户，请重新登录' } };
	let result = user.goodVideo.indexOf(videoId) > -1 &&
		await cancelGood(userId, videoId) ||
		await addGood(userId, videoId);
	return ctx.body = result;
}
/* 点赞 */
async function addGood(user, video) {
	let result = await VideoModel.update({ _id: video }, { $inc: { goodCount: 1 } });
	if (!result.n) { return { err: '找不到视频,请刷新' } }
	result = await UserModel.update({ _id: user }, { $push: { goodVideo: video } });
	if (!result.n) { return { err: '点赞失败' } }
	return { ok: '点赞成功' }
}
/* 取消点赞 */
async function cancelGood(user, video) {
	let result = await VideoModel.update({ _id: video }, { $inc: { goodCount: -1 } });
	if (!result.n) { return { err: '找不到视频,请刷新' }; }
	result = await UserModel.update({ _id: user }, { $pull: { goodVideo: video } });
	if (!result.n) { return { err: '取消点赞失败' } }
	return { ok: '取消点赞成功' }
}

/* 收藏视频 user&video */
exports.collectVideo = async (ctx) => {
	const { userId, videoId } = ctx.query;
	let user = await UserModel.findById(userId);
	if (!user) { return { err: '找不到当前用户，请重新登录' } };
	let result = user.collectVideo.indexOf(videoId) > -1 &&
		await cancelCollect(userId, videoId) ||
		await addCollect(userId, videoId);
	console.log(result);
	return ctx.body = result;
}
/* 收藏 */
async function addCollect(user, video) {
	let result = await UserModel.update({ _id: user }, { $push: { collectVideo: video } });
	if (!result.n) { return { err: '收藏失败' } }
	return { ok: '收藏成功' }
}
/* 取消收藏 */
async function cancelCollect(user, video) {
	let result = await UserModel.update({ _id: user }, { $pull: { collectVideo: video } });
	if (result.n == 0) { return { err: '取消收藏失败' } }
	return { ok: '取消收藏成功' }
}

/* 获取收藏的视频列表 status <= 2 */
exports.getCollectList = async (ctx) => {
	const { userId, pn } = ctx.query;
	let user = await UserModel.findById(userId);
	if (!user) { return ctx.body = { err: '找不到当前用户，请重新登录' } };
	let videos = await VideoModel.find({ _id: user.collectVideo, status: 1 })
		.populate('user', 'name _id header')
		.sort({ createAt: -1 })
		.skip(size * pn)
		.limit(size)
	return ctx.body = { videos }
}

/* 用户删除自己的视频视频，仅修改video.status, 不从user.videos中删除 */
exports.deleteVideo = async (ctx) => {
	const { userId, videoId } = ctx.query;
	let user = await UserModel.findById(userId);
	if(!user) {return ctx.body = {err: '找不到当前用户，请重新登录'} };
	let result;
	// 管理员删除
	if(user.authority > 1) {
		result = await VideoModel.update({ _id: videoId}, { $set: { status: 2 } });
	}
	// 用户自己删除
	else {
		result = await VideoModel.update({ _id: videoId, user: userId }, { $set: { status: 3 } });
	}
	if (result.n == 0) { return ctx.body = { err: '参数失败，删除视频失败' } };
	return ctx.body = { ok: '删除视频成功' };
}