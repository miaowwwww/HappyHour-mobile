var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new Schema({
  name: String,
  movies: [{ type: ObjectId, ref: 'Video' }],
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

// var ObjectId = mongoose.Schema.Types.ObjectId
CategorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }

  next()
})

CategorySchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}

module.exports = CategorySchema