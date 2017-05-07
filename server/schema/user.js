const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs')
// const bcrypt = require('bcrypt')	//为密码存储设计的算法
// const SALT_WORK_FACTOR = 10     //加盐长度，默认是10
/* 不能依赖model */
// const UserModel = require('../model/User.js');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
	account: String,
	password: String,
	name: String,
	sex: { type: Number, default: 1 },
	summary: String,
	tel: String,
	email: String,
	header: String,
	status: { type: Number, default: 1 },
	videos: [
		{ type: ObjectId, ref: 'Video' }
	],
	authority: { type: Number, default: 0 },//0：用户，1：提升的管理员，9：最高管理员 
	followCount: { type: Number, default: 0 },
	followUser: [
		{ type: ObjectId, ref: "User" }
	],
	starUser: [
		{ type: ObjectId, ref: "User" }
	],
	starCount: { type: Number, default: 0 },
	collectVideo: [
		{ type: ObjectId, ref: 'Video' }
	],
	goodVideo: [
		{ type: ObjectId, ref: 'Video' }
	],
	createAt: { type: Date, default: Date.now },
	updateAt: { type: Date, default: Date.now }

})

// pre,在save之前执行的一些操作
UserSchema.pre('save', function (next) {
	var user = this 	//当前操作的user对象
	if (!this.isNew) {
		this.updateAt = Date.now()
	}
	if (!this.name) {
		this.name = this.account;
	}
	next();
	//对密码进行哈希加盐 
	/*bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	  if (err) return next(err)
 
	  bcrypt.hash(user.password, salt, null,function(err, hash) {
		 if (err) return next(err)
 
		 user.password = hash
		 next()
	  })
	})*/
})


UserSchema.statics = {
	findPersonById: function (_id) {
		return new Promise((resolve, reject) => {
			this
				.findOne({ _id })
				.populate({
					path: 'videos',
					select: 'title _id poster introduction', 
					match: { status: 1 } ,
					options: { 
						populate: { 
							path: 'user'
						},
						sort: {createAt: -1}
					}
				})
				.exec((err, person) => {
					resolve(person);
				})
		})
	},
	findById: function (_id) {
		return new Promise((resolve, reject) => {
			this.findOne({ _id }, (err, user) => {
				return resolve(user);
			})
		})
	},
	findByAccount: function (account) {
		return new Promise((resolve, reject) => {
			this.findOne({ account }, (err, user) => resolve(user));
		})
	},
	save: function (user) {
		return new Promise((resolve, reject) => {
			/* 这里不能获取UserModel，循环依赖*/
			// new UserModel(user).save((err, newuser) => resolve(newuser) ) 
			let model = this.model('User');
			new model(user).save((err, newuser) => resolve(newuser))
		})
	}
}

module.exports = UserSchema;

/* 数据库语句的错误不应该返回到客户端，打印日志即可 */
