
// STOCK-AI.COM: 投資級經濟指標使用指南
// M1B 貨幣總計數 (= M1A ＋ 活期儲蓄存款) 

// TWSE Cap Schema
var mongoose = require('mongoose');

// twCap- Taiwan Cap Schema
var twM1bSchema = new mongoose.Schema({
    date: Date,		// 日期
    price: String // M1B 貨幣總計數 (十億台幣)
}, {collection: 'twM1bs'});

module.exports = mongoose.model('twM1b', twM1bSchema);