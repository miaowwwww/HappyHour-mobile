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
	console.log(_comment)
	/* 视频commentCount + 1 */
	await VideoModel.update({_id: video}, {$inc: {commentCount: 1}});
	ctx.body = { 
		_id: _comment._id, 
		meta: _comment.meta,
	}
}

/* 点赞视频 */
exports.good = async( ctx ) => {
	const { videoId } = ctx.params;
	const { _id } = ctx.session.user;
	console.log(video + '--' + _id);
	/* 视频commentCount + 1 */
	await VideoModel.update({_id: videoId}, {$inc: {goodCount: 1}});
	await UserModel.update({_id: _id}, {$push: {goodVideos: videoId}});
	ctx.body = {ok: 'ok'}
}