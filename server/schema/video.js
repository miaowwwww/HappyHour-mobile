const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const VideoSchema = new Schema({
	user: { type: ObjectId, ref: 'User' },
	// category: {	type: ObjectId,	ref: 'Category'	},
	title: String, //	String	10	标题
	introduction: String,//	String	20	简介
	poster: String, //应该是一个id，	Img	--	海报
	flash: String,//	String	20	文件地址或者文件名
	commentCount: { type: Number, default: 0 },//	Number	--	评论数
	goodCount: { type: Number, default: 0 },//	Number	--	点赞数
	// collectCount: { type: Number, default: 0 },//	Number	--	收藏数
	seeCount: { type: Number, default: 0 },//Number	--	观看次数（重复也+1）
	status: { type: String, default: 1 },//Number	1：正常，2：管理员删除，3：用户删除
	durations: String, //String	--	视频时长
	createAt: { type: Date, default: Date.now() }

})

VideoSchema.pre('save',function(next){
	if(this.isNew){
		this.createAt = this.updateAt = Date.now();
	}
	else{
		this.updateAt = Date.now();
	};
	next();
})

const opt = [
	{ path: 'user', select: 'account' }
]

VideoSchema.statics = {
	queryList: function ({ pn, size, select={} }) {
		return new Promise( (resolve, reject ) => {
			this
				.find(select)
				.sort({ 'createAt': -1 })
				.skip(size * pn)
				.limit(size)
				.populate('user', '_id header name')
				.exec((err, list) => {
					resolve(list);
				})
		})
	},

	saveVideo: function(video) {
		return new Promise((resolve, reject) => {
			let model = this.model('Video');
			new model(video).save((err, data) => resolve(data))
		})
	}
}
// VideoSchema.statics.saveVideo = (video) => {
// 	return new Promise((resolve, reject) => {
// 		let model = this.model('Video');
// 		new model(video).save((err, data) => resolve(data))
// 	})
// }
module.exports = VideoSchema

