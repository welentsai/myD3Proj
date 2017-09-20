
// TWSE 個股日成交資訊 Schema

var mongoose = require('mongoose');

var tradingSchema = new mongoose.Schema({
    date: Date, //日期
    vol: String, //成交股數
    to: String, // 成交金額 (TurnOver in value)
    op: String, // 開盤價 (today's opening price)
    th: String, // 最高價 (today's high)
    tl: String, // 最低價 (today's low)
    cp: String, // 收盤價 (today's close price)
    chg: String, // 漲跌價差 (change)
    txn: String  // 成交筆數 (transaction)
}, {collection: 'tradings'});

module.exports = mongoose.model('trading', tradingSchema);