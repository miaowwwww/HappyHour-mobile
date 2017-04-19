const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const NoticeSchema = new mongoose.Schema({
	from: {	type: ObjectId,	ref: 'User'},
	content: String,
	status: {	type: Number,	default: 1 },
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

NoticeSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	};
	next();
})

NoticeSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
}

module.exports = NoticeSchema