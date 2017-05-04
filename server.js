const Koa = require('koa');
const Mongoose = require('mongoose');
// const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Http = require('http');
const KoaLogger = require('koa-logger');
const KoaStatic = require('koa-static');
// const KoaStatic2 = require('koa-static2');
// const Multer = require('koa-multer');
// const KoaSession = require('koa-session');
// const KoaSessionMinimal = require('koa-session-minimal');

const Router = require('./server/router/index.js');

// 基本量
const PORT = 3000;
const dbDomain = 'localhost';
const dbName = 'HappyHour';
const MongoDBUrl = `mongodb://${dbDomain}/${dbName}`;

const app = new Koa();

// session
// app.keys = ['some secret hurr'];
// const CONFIG = {
// 	key: 'HH-session-id',
// 	maxAge: 1000 * 30,
// 	overwrite: true,
// 	httpOnly: true,
// 	signed: true,
// };

// 依赖插件实例rs
app.use(KoaLogger());
app.use(KoaStatic(__dirname + "/upload", { extensions: ['png', 'jpg', 'jpeg', 'mp4'] }));
app.use(KoaStatic(__dirname + "/dist", { extensions: ['html', 'css', 'js'] }));
app.use(BodyParser());
// 移动端没办法使用session，每一个请求都会重新发送一个sessionId
// app.use(KoaSessionMinimal({
// 	key: 'session-id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
// 	cookie: {                   // 与 cookie 相关的配置
// 		domain: 'localhost',    // 写 cookie 所在的域名
// 		path: '/',              // 写 cookie 所在的路径
// 		maxAge: 1000 * 60 * 60,      // cookie 有效时长
// 		httpOnly: true,         // 是否只用于 http 请求中获取
// 		overwrite: false        // 是否允许重写
// 	}
// }))
app.use(Router.routes(), Router.allowedMethods());
// app.use(KoaSession(CONFIG, app));

// mongode
Mongoose.connect(MongoDBUrl);
const db = Mongoose.connection;
db.on('error', (err) => {
	console.log(`mongo connection error ${err}`);
});
db.on('open', () => {
	console.log('Mongo connect success');
});


Http.createServer(app.callback()).listen(PORT, () => {
	console.log(`app is running on ${PORT}`);
})
// app.listen(PORT, () => {
// 	console.log(`app is running on ${PORT}`);
// })
