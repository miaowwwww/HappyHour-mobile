const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const NoticeSchema = new mongoose.Schema({
	from: {	type: ObjectId,	ref: 'User'},
	content: String,
	title: String,
	status: {	type: Number,	default: 1 },
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	},

})

NoticeSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	};
	next();
})

NoticeSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('updateAt')
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