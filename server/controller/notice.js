const UserModel = require('../model/user.js');
const NoticeModel = require('../model/notice.js');
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
 * ctx.body = {err}
 * ctx.body = {ok}
*/

/* 添加公告 */
exports.add = async( ctx ) => {
	const {title, content} = ctx.request.body;
	let repoter = await UserModel.findById(ctx.token.userId);
	if(!repoter) { return ctx.body = {err: '找不到登录信息，请重新登录'}};
	let newNotice =  new NoticeModel({
		title: title,
		content: content,
		from: repoter._id,
	})
	let notice = await newNotice.save();
	return ctx.body = {ok: '发布成功'}
}

/* 获取公告列表 ?pn=0 */
exports.query = async(ctx) => {
	const size = 1000;
	const { pn } = ctx.query;
	myconsole(pn);
	let notices = await NoticeModel.find().sort({createAt: -1}).skip(pn * size).limit(size);
	if(!notices) { return ctx.body = {err: '数据库查找出错'}}
	ctx.body = {notices}
}