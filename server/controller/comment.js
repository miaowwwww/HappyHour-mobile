const CommentModel = require('../model/comment.js');
const VideoModel = require('../model/video.js');
const UserModel = require('../model/user.js');
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
*/

/* 列表分页size */
const size = 10;
/* 通过视频id获取comment */
exports.query = async (ctx) => {
	const { pn = 1 } = ctx.query;
	const { videoId } = ctx.params;
	const list = await CommentModel.queryList({videoId, pn: pn - 1, size});
	if(list.length < size) {
		return ctx.body = { list, nomore: true}
	}
	ctx.body = {list}
}


/* 添加评论 */
exports.add = async( ctx ) => {
	const comment = ctx.request.body;
	const { from, to, video } = comment;
	const _comment = await CommentModel.save(comment);
	await VideoModel.update({_id: video}, {$inc: {commentCount: 1}});
	ctx.body = {comment: _comment}


}