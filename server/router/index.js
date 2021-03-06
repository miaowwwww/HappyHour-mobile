// const User = require('./user.js');
// const Video = require('./video.js');
const Router = require('koa-router');
const fs = require('fs');
const router = new Router({ prefix: '/api' })
const Multer = require('koa-multer');


// const { uploadImage, uploadVideo } = require('../controller/tool.js');
const userCtrl = require('../controller/user.js');
const videoCtrl = require('../controller/video.js');
const commentCtrl = require('../controller/comment.js');
const noticeCtrl = require('../controller/notice.js');
const { isLogined } = require('../controller/jwk.js');

const uploadVideo = Multer({ dest: 'upload/cache/video' });
const updateUserInfo = Multer({ dest: 'upload/cache/header' })

/* 用户模块: 登录 */
router.post('/user/login', userCtrl.login);
/* 用户模块: 注册 */
router.post('/user/regist', userCtrl.regist);
/* 用户模块： 修改个人信息 表单修改，包括头像 */
router.post('/user/update', isLogined, updateUserInfo.single('header'), userCtrl.update);
/* 用户模块: 修改密码 body: {_id, oldpwd, newpwd} */
router.post('/user/update/password', isLogined, userCtrl.updatePassword);
/* 用户模块： 登出 id*/
router.get('/user/logout/:id', isLogined, userCtrl.logout);
/* 用户模块： 获取某个用户person */
router.get('/user/fetchOne/:id', userCtrl.fetchOne);
/* 用户模块：关注、取消关注 ?user=x&person=xx */
router.get('/user/follow', isLogined, userCtrl.personFollow);
/* 用户模块：搜索keyword--name搜素用户*/
router.get('/user/search', userCtrl.search)
/* 用户模块：获取用户关注的用户列表 */
router.get('/user/star', isLogined, userCtrl.getStarUser);


/* 视频模块：上传 */
router.post('/video/upload', isLogined, uploadVideo.any(), videoCtrl.uploadVideo, videoCtrl.uploadPoster, videoCtrl.save)
/* 视屏模块：获取列表 */
router.get('/video/list', videoCtrl.queryList)
/* 视频模块：获取特定用户的视屏 */
router.get('/video/person', videoCtrl.queryPersonVideo);
/* 视频模块：获取关注的用户的视频列表*/
router.get('/video/followlist', isLogined, videoCtrl.followList);
/* 视频模块：通过keyword获取视频 */
router.get('/video/search', videoCtrl.search)
/* 视频模块：通过id获取特定的视频 */
router.get('/video/fetchOne/:id', videoCtrl.getVideo);
/* 视频模块：为视频点赞user&video */
router.get('/video/good', isLogined, videoCtrl.goodVideo)
/* 视频模块：收藏user&video */
router.get('/video/collect', isLogined, videoCtrl.collectVideo)
/* 视频模块：获取收藏列表 userId&pn */
router.get('/video/collectlist', isLogined, videoCtrl.getCollectList)
/* 视频模块：删除视频 userId, videoId */
router.get('/video/delete', isLogined, videoCtrl.deleteVideo)


/* 评论模块：获取视频评论 */
router.get('/video/:videoId/comment', commentCtrl.query)
/* 评论模块：发布评论 */
router.post('/video/comment', isLogined, commentCtrl.add)
/* 评论模块：用户删除评论 */
router.get('/video/comment/delete', isLogined, commentCtrl.deleteComment)


/* 公告模块: 添加公告 */
router.post('/notice/add', isLogined, noticeCtrl.add)
/* 公告模块：获取公告列表 */
router.get('/notice/query', noticeCtrl.query)
module.exports = router;