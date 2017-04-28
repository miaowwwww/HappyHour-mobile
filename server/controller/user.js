// import * as UserModel from '../model/User.js';
const UserModel = require('../model/user.js');

/*
 * 约定： 如果一个请求发出非sql语句错误，必有 err 返回，若err == undefined 即成功
*/
/*
let registError = {
	err: '账号已存在'
}
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