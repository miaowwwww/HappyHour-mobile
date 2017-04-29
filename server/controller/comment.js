const CommentModel = require('../model/comment.js');

/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
*/

/* 列表分页size */
const size = 10;
/* 通过视频id获取comment */
exports.query = async (ctx) => {
	console.log(ctx.query)
	const { pn = 1 } = ctx.query;
	console.log(ctx.params);
	const { videoId } = ctx.params;
	const list = await CommentModel.queryList({videoId, pn: pn - 1, size});
	console.log(list);
	if(list.length < size) {
		return ctx.body = { list, nomore: true}
	}
	ctx.body = {list}
}


/* 登录 */
exports.login = async( ctx ) => {
	let loginer = ctx.request.body;
	/* 判断一致性 */
	let user = await UserModel.findByAccount( loginer.account );
	if( !user || user.password !== loginer.password ) {
		return ctx.body = { err: '账号密码不匹配' };
	}
	ctx.session.user = user;
	return ctx.body = user;
}