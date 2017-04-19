const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.type.ObjectId;

const VideoSchema = new Schema({
	user: {	type: ObjectId,	ref: 'User'	},
	category: {	type: ObjectId,	ref: 'Category'	},
	title: String, //	String	10	标题
	introduction: String,//	String	20	简介
	poster: String, //应该是一个id，	Img	--	海报
	flash: String,//	String	20	文件地址或者文件名
	commentCount: {type: Number, default: 0},//	Number	--	评论数
	favoriteCount: {type: Number, default: 0},//	Number	--	点赞数
	collectCount: {type: Number, default: 0},//	Number	--	收藏数
	seeCount:	{type: Number, default: 0},//Number	--	观看次数（重复也+1）
	status:	{type: String, default: 1},//Number	1	0， 1
	durations: String, //String	--	视频时长
	meta: {
		createAt: {	type: Date,	default: Date.now()	}
		// updateAt: {	type: Date,	default: Date.now()	}
	}
})

// VideoSchema.pre('save',function(next){
// 	if(this.isNew){
// 		this.meta.createAt = this.meta.updateAt = Date.now();
// 	}
// 	else{
// 		this.meta.updateAt = Date.now();
// 	};
// 	next();
// })

VideoSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.createAt')
			.exec(cb)
	},
	findById: function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = VideoSchema

