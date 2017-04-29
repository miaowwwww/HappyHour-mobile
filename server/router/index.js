// const User = require('./user.js');
// const Video = require('./video.js');
const Router = require('koa-router');
const fs = require('fs');
const router = new Router({ prefix: '/api' })
const Multer = require('koa-multer');
const upload = Multer({ dest: 'upload/cache/' });

// const { uploadImage, uploadVideo } = require('../controller/tool.js');
const userCtrl = require('../controller/user.js');
const videoCtrl = require('../controller/video.js');
const commentCtrl = require('../controller/comment.js');


/* 用户模块: 登录 */
router.post('/user/login', userCtrl.login)
/* 用户模块: 注册 */
router.post('/user/regist', userCtrl.regist);

/* 视频模块：上传 */
router.post('/video/upload', upload.any(), videoCtrl.uploadPoster, videoCtrl.uploadVideo, videoCtrl.save )
/* 视屏模块：获取列表 */
router.get('/video/list', videoCtrl.queryList)

/* 评论模块：获取视频评论 */
router.get('/video/:videoId/comment', commentCtrl.query)
/* 评论模块：发布评论 */
router.post('/video/comment', commentCtrl.add)


module.exports = router;