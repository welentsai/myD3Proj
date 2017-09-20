
// STOCK-AI.COM: 投資級經濟指標使用指南
// 台灣景氣對策信號(分數) Taiwan Monitoring indicators

// 台灣景氣對策信號 Schema
var mongoose = require('mongoose');

// twIdx - Taiwan Index
var twIdxSchema = new mongoose.Schema({
    date: Date,		// 日期
    score: String // 景氣燈號分數
}, {collection: 'twIdxes'});

module.exports = mongoose.model('twIdx', twIdxSchema);