const mongoose = require('mongoose');
const VideoSchema = require('../schema/video');
const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;