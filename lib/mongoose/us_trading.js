
// S&P 500 個股日成交資訊 Schema

var mongoose = require('mongoose');

var UStradingSchema = new mongoose.Schema({
    date: Date, //日期
    op: String, // 開盤價 (today's opening price)
    th: String, // 最高價 (today's high)
    tl: String, // 最低價 (today's low)
    cp: String, // 收盤價 (today's close price)
    vol: String //成交股數
}, {collection: 'UStradings'});

module.exports = mongoose.model('UStrading', UStradingSchema);