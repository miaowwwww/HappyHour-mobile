const Koa = require('koa');
const Mongoose = require('mongoose');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser')();
const Http = require('http');

const routers = require('./router/index.js')
const KoaLogger = require('koa-logger');

// 基本量
const PORT = 3000;
const dbDomain = 'localhost';
const dbName = 'HappyHour';
const MongoDBUrl = `mongodb://${dbDomain}/${dbName}`;


// 依赖插件实例
const app = new Koa();

app.use(KoaLogger());
app.use(BodyParser);
routers(app);

// mongode
Mongoose.connect(MongoDBUrl);
const db = Mongoose.connection;
db.on('error', (err) => {
	console.log(`mongo connection error ${err}`);
});
db.on('open', () => {
	console.log('Mongo connect success');
});

app.listen(PORT, () => {
	console.log(`app is running on ${PORT}`);
})


