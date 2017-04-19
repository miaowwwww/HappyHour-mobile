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
	sex: Number,
	summary: String,
	tel: String,
	email: String,
	img: String,
	status: {	type: Number,	default: 1},
	videos: [
		{type: ObjectId, ref: 'Video'}
	],
	authority: Number,
	followCount: { type: Number, default: 0 },
	followUser: [
		{	type: ObjectId, ref: "User"	}
	],
	starUser: [
		{	type: ObjectId, ref: "User"	}
	],
	starVideos: [
		{ type: ObjectId, ref: 'Video'}
	],
	meta: {
		createAt: {	type: Date,	default: Date.now},
		updateAt: {	type: Date,	default: Date.now}
	}
})

// pre,在save之前执行的一些操作
UserSchema.pre('save', function(next) {
  var user = this 	//当前操作的user对象
  if (!this.isNew) {
    this.meta.updateAt = Date.now()
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
  qusery: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  },
	findByAccount: function(account) {
		return new Promise((resolve, reject) => {
			this.findOne({account}, (err, user) => resolve(user));
		}) 
	},
	save: function(user) {
		return new Promise((resolve, reject) => {
			/* 这里不能获取UserModel，循环依赖*/
			// new UserModel(user).save((err, newuser) => resolve(newuser) ) 
			let model = this.model('User');
			new model(user).save((err, newuser) => resolve(newuser) )
		})
	}
}

module.exports = UserSchema;

/* 数据库语句的错误不应该返回到客户端，打印日志即可 */
