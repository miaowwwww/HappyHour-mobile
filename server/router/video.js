const Router = require('koa-router');
// const videoModel = require('../model/video.js');
const VideoRouter = new Router({prefix: '/api'});
const VideoCtrl = require('../controller/video.js');
const Multer = require('koa-multer');

const upload = Multer({ dest: 'upload/'});

/* 上传 */
VideoRouter.post('/video/upload',  
	upload.single('poster'), 
	/*  VideoRouter.upload */ 
	(ctx) => {
		console.log('1111111')
		console.log(ctx.request.body);
		console.log(ctx.request.files)
		console.log(ctx.request.file)
		console.log(ctx.req.file)
		console.log(ctx.req.files)
		ctx.body = {
			success: 'ok'
		}
})

module.exports = VideoRouter;

