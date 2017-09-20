// 匯率 Schema

var mongoose = require('mongoose');

var rateSchema = new mongoose.Schema({
    date: Date,
    bank: String,
    currency: String,
    cashBuy: String,
    cashSell: String,
    sightBuy: String,
    sightSell: String,
}, {collection: 'rates'});

module.exports = mongoose.model('rate', rateSchema);