
// 美國聯邦基金匯率 Schema
// Federal Funds Rate

var mongoose = require('mongoose');

var fedFundSchema = new mongoose.Schema({
    date: Date, // 日期
    rate: String // Fed Funds Rate
}, {collection: 'fedFunds'});

module.exports = mongoose.model('fedFund', fedFundSchema);