const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const CommentSchema = new mongoose.Schema({
	video: { type: ObjectId, ref: 'Video' },
	from: { type: ObjectId, ref: 'User' },
	to: { type: ObjectId, ref: 'User' },
	reply: [{
		from: { type: ObjectId, ref: 'User' },
		to: { type: ObjectId, ref: 'User' },
		content: String,
		status: { type: Number, default: 1 },
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}],
	content: String,
	status: { type: Number, default: 1 },
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	}
})

CommentSchema.pre('save', function (next) {
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	};
	next();
})

CommentSchema.statics = {
	/* 根据videoId，获取commentlist */
	queryList: function ({ videoId, pn, size }) {
		return new Promise((resolve, reject) => {
			this
				.find({ video: videoId })
				.sort({ 'updateAt': -1 })
				.skip(size * pn)
				.limit(size)
				.populate('from to', '_id name header')
				.exec((err, list) => {
					resolve(list)
				})

		})
	},
	save: function (comment) {
		return new Promise((resolve, reject) => {
			let model = this.model('Comment');
			new model(comment).save((err, data) => resolve(data))
		})
	},
	fetchOne: function (id) {
		return new Promise((resolve, reject) => {
			this
				.find({
					_id: id
				})
				.populate('form to video')
				.exec((err, list) => {
					resolve(list)
				})

		})
	},
	fetch: function (cb) {
		return this
			.find({})
			.sort('updateAt')
			.exec(cb)
	},
}

module.exports = CommentSchema