
// STOCK-AI.COM: 投資級經濟指標使用指南
// 台灣台股上市公司當月總市值 TWSE Market Capitalization

// TWSE Cap Schema
var mongoose = require('mongoose');

// twCap- Taiwan Cap Schema
var twCapSchema = new mongoose.Schema({
    date: Date,		// 日期
    price: String // 總市值(百萬台幣)
}, {collection: 'twCaps'});

module.exports = mongoose.model('twCap', twCapSchema);