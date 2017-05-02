const Router = require('koa-router');
const UserModel = require('../model/User.js');
const UserRouter = new Router({prefix: '/api'});

const userCtrl = require('../controller/user.js');

/* 登录 */
UserRouter.post('/user/login', userCtrl.login)
/* 注册 */
UserRouter.post('/user/regist', userCtrl.regist);
module.exports = UserRouter;

