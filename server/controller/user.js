// import * as UserModel from '../model/User.js';
const UserModel = require('../model/user.js');
const VideoModel = require('../model/video.js');
const tool = require('./tool.js');
const fs = require('fs');
/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
 * {err} {ok/data}
*/


/* 注册 */
exports.regist = async(ctx) => {
	let { account } = ctx.request.body;
	/* 判断是否已经存在 */
	let isExisted = await UserModel.findByAccount(account);
	if( isExisted ) {
		return ctx.body = {
			err: '账号已存在'
		};
	}
	/* 保存到数据库， 要防止sql注入 ，这里暂时还不做处理 */
	let user = await UserModel.save(ctx.request.body);

	/* return 如果不需要注册之后自动登录，不需要把user返回 */
	return ctx.body = {	...user }
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

/* 退出 */
exports.logout = async (ctx) => {
	const {id} = ctx.params;
	ctx.session.user = null;
	ctx.body = {ok: 'ok'};
	
}
/* 更新 包括头像 */
exports.update = async (ctx) => {
	let headerFile = ctx.req.file;
	let _user = ctx.req.body;

	if( headerFile ) {
		_user.header = await tool.uploadFile(headerFile, 'upload/header', 'png');
	}

	let user = await UserModel.findById(_user._id);
	if(!user) { return ctx.body = {err: '找不到用户'}	}

	Object.assign(user, _user);
	await UserModel.save(user);
	return ctx.body = {user}
}

/*修改密码 body: {_id, oldpwd, newpwd}*/
exports.updatePassword = async (ctx) => {
	let {_id, oldpwd, newpwd} = ctx.request.body;
	let _user = await UserModel.findById(_id);
	if(!_user) {return ctx.body = {err: '找不到用户'}};
	if(_user.password !== oldpwd) {
		return ctx.body = {err: '旧密码错误'}
	}
	_user.password = newpwd;
	await UserModel.save(_user);
	return ctx.body = {ok: 'ok'};

}

/* 获取某个用户 ctx.params.id*/
exports.fetchOne = async (ctx) => {
	const { id } = ctx.params;
	let person = await UserModel.findPersonById(id);

	if(person) { 
		person = person.toJSON();
		const { user } = ctx.session;
		person.isUser = user && user._id.toString() == person._id.toString()
		return ctx.body = {person};
	};
	return ctx.body = {err: '找不到用户'}
}

/* 关注用户 */
exports.personFollow = async (ctx) => {
	const { user, person } = ctx.query;
	if(user !== ctx.session.user._id) { return ctx.body = {err: '用户不匹配'} }
	/* 更新用户 */
	await UserModel.update({_id: user}, {$inc: {starCount: 1}, $push: {starUser: person}});
	/* 更新被关注者 */
	await UserModel.update({_id: person}, {$inc: {followCount: 1}, $push: {followUser: user}});
}
/* 取消关注 */
function unfollow() {

}