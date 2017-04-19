const mongoose = require('mongoose');
const NoticeSchema = require('../schema/notice');
const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;