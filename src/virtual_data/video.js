import user from './user.js';
import category from './category.js';
const video = {
	id: '1234',//	String	--	视频id
	userId: 'userid',//	objectId	--	上传用户id
	user: user,
	categoryId: 'categoryid', //	objectId	--	类型id（类型表，保留）
	category: category,
	title: 'istitle', //	String	10	标题
	introduction: 'is introduction 简介',//	String	20	简介
	poster: 'poster.png', //应该是一个id，	Img	--	海报
	flash: 'http://sssss.com',//	String	20	文件地址或者文件名
	commentCount: 9,//	Number	--	评论数
	favoriteCount: 10,//	Number	--	点赞数
	collectCount: 11,//	Number	--	收藏数
	seeCount:	12,//Number	--	观看次数（重复也+1）
	status:	1,//Number	1	0， 1
	createTime:	'2017-4-10',//Date	--	创建时间
	durations: '2:30' //String	--	视频时长
}
export default video;