const CommentModel = require('../model/comment.js');
const VideoModel = require('../model/video.js');
const UserModel = require('../model/user.js');
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
 * ctx.body = {err}
 * ctx.body = {ok}
*/

/* 列表分页size */
const size = 100;
/* 通过视频id获取comment */
exports.query = async (ctx) => {
	const { pn = 1 } = ctx.query;
	const { videoId } = ctx.params;
	const list = await CommentModel.queryList({videoId, pn: pn - 1, size});

	/* 视频seeCount + 1 */
	await VideoModel.update({_id: videoId}, {$inc: {seeCount: 1}});
	if(list.length < size) {
		return ctx.body = { list, nomore: true}
	}
	ctx.body = {list}
}


/* 添加评论 */
exports.add = async( ctx ) => {
	const comment = ctx.request.body;
	const { from, to, video, content } = comment;
	const _comment = await CommentModel.save({video, content, from: from._id, to: to && to._id})
	/* 视频commentCount + 1 */
	await VideoModel.update({_id: video}, {$inc: {commentCount: 1}});
	ctx.body = { 
		_id: _comment._id, 
		createAt: _comment.createAt,
	}
}

/* 点赞视频 */
exports.good = async( ctx ) => {
	const { videoId } = ctx.params;
	const { _id } = ctx.session.user;
	/* 视频commentCount + 1 */
	await VideoModel.update({_id: videoId}, {$inc: {goodCount: 1}});
	await UserModel.update({_id: _id}, {$push: {goodVideos: videoId}});
	ctx.body = {ok: 'ok'}
}

/* 用户删除自己的评论 */
exports.deleteComment = async (ctx) => {
	const { fromId, commentId, videoId } = ctx.query;
	if(fromId != ctx.token.userId) {return ctx.body = { err: '这不是你的评论'}};
	let result = await CommentModel.update({from: fromId, _id: commentId}, {$set: {status: 3}});
	if(!result.ok) { return ctx.body = {err: '删除失败'}};
	result = await VideoModel.update({_id: videoId}, {$inc: {commentCount: -1}});
	return ctx.body = {ok: '删除成功', commentId, videoId };
}