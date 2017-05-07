// import * as UserModel from '../model/User.js';
const UserModel = require('../model/user.js');
const VideoModel = require('../model/video.js');
const tool = require('./tool.js');
const jwk = require('./jwk.js');

// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
 * {err} {ok/data}
*/


/* 注册 */
exports.regist = async (ctx) => {
	let { account } = ctx.request.body;
	/* 判断是否已经存在 */
	let isExisted = await UserModel.findByAccount(account);
	if (isExisted) {
		return ctx.body = {
			err: '账号已存在'
		};
	}
	/* 保存到数据库， 要防止sql注入 ，这里暂时还不做处理 */
	let user = await UserModel.save(ctx.request.body);

	/* return 如果不需要注册之后自动登录，不需要把user返回 */
	return ctx.body = { ...user }
}

/* 登录 */
exports.login = async (ctx) => {
	let loginer = ctx.request.body;
	/* 判断一致性 */
	let user = await UserModel.findByAccount(loginer.account);
	if (!user || user.password !== loginer.password) {
		return ctx.body = { err: '账号密码不匹配' };
	}
	let token = jwk.createToken({ userId: user._id, timetamp: new Date().getTime() });
	// ctx.session.user = user;
	return ctx.body = {
		user,
		token
	};
}

/* 退出 */
exports.logout = async (ctx) => {
	const { id } = ctx.params;
	ctx.body = { ok: '退出成功' };

}
/* 更新 包括头像 */
exports.update = async (ctx) => {
	let headerFile = ctx.req.file;
	let _user = ctx.req.body;

	let user = await UserModel.findById(_user._id);
	if (!user) { return ctx.body = { err: '找不到用户' } }

	if (headerFile) {
		_user.header = await tool.uploadFile(headerFile, 'upload/header', 'png');
	}

	Object.assign(user, _user);
	await UserModel.save(user);
	return ctx.body = { user }
}

/*修改密码 body: {_id, oldpwd, newpwd}*/
exports.updatePassword = async (ctx) => {
	let { _id, oldpwd, newpwd } = ctx.request.body;
	let _user = await UserModel.findById(_id);
	if (!_user) { return ctx.body = { err: '找不到用户' } };
	if (_user.password !== oldpwd) {
		return ctx.body = { err: '旧密码错误' }
	}
	_user.password = newpwd;
	await UserModel.save(_user);
	return ctx.body = { ok: 'ok' };

}

/* 获取某个用户 ctx.params.id*/
exports.fetchOne = async (ctx) => {
	const { id } = ctx.params;
	let person = await UserModel.findPersonById(id);
	if (!person) { return ctx.body = { err: '找不到用户' } };

	/* 判断是否当前用户 person == user */
	return ctx.body = { person };
}

/* 关注用户 */
exports.personFollow = async (ctx) => {
	const { user, person } = ctx.query;
	/* 判断用户是否存在 */
	let _user = await UserModel.findById(user);
	if (!_user) { return ctx.body = { err: '用户信息错误，请从新登陆' } }
	/* 判断当前是关注状态还是非关注状态 */
	let isfollowing = _user.starUser.indexOf(person); // > -1;

	let ok = 'ok';
	ok = (isfollowing > -1) ? await unfollow(user, person) : await addfollow(user, person);
	return ctx.body = { ok }
}
/* 关注 */
async function addfollow(user, person) {
	await UserModel.update({ _id: user }, { $inc: { starCount: 1 }, $push: { starUser: person } });
	await UserModel.update({ _id: person }, { $inc: { followCount: 1 }, $push: { followUser: user } });
	return '关注成功';
}
/* 取消关注 */
async function unfollow(user, person) {
	await UserModel.update({ _id: user }, { $inc: { starCount: -1 }, $pull: { starUser: person } });
	await UserModel.update({ _id: person }, { $inc: { followCount: -1 }, $pull: { followUser: user } });
	return '取消关注成功';
}

/* 根据keyword--name 搜索用户 */
exports.search = async (ctx) => {
	const { keyword, pn } = ctx.query;
	const size = 100;
	let reg = new RegExp(keyword, 'gi');
	let users = await UserModel.find({name: reg}, '_id name summary sex header')
										.sort({followCount: -1})
										.skip((pn-1) * size)
										.limit(size);
	return ctx.body = {users}

}

/* 获取用户关注的人的列表 */
exports.getStarUser = async (ctx) => {
	const { userId, pn } = ctx.query;
	const size = 100;
	let user = await UserModel.findById(userId);
	if(!user) { return ctx.body = { err: '没有找到当前用户，请重新登录'}};
	let users = await UserModel.find({_id: user.starUser}, '_id name header summary')
								.skip(size * pn)
								.limit(size)
								.sort({createAt: -1})
	return ctx.body = {users};
}