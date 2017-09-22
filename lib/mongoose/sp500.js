'use strict';

// S&P500 個股日成交資訊 DB Operation Module

const mongoose = require('mongoose');
const moment = require('moment');

// 自訂 module
const mgConn = require('./mgConn.js');

const ustrading = require('./schema/us_trading.js'); // 載入 S&P 500 個股日成交資訊 Schema/Model

// constructor
function sp500 () {
	mgConn.init();
}

// 新增多筆 SP500 交易資料
sp500.prototype.updateTradings = function(datas, options, callback) {
	console.log("sp500.updateTradings() !!");
	console.log("total count is : " + datas.length);

	ustrading.insertMany(datas, function(err, doc) {
		if(err) {
		    console.log(err);
		    callback(err);
		}
	});

	callback(); // means ok and pass back 
}

// Find() - SP500 交易資料 全部
sp500.prototype.getHistory = function(callback) {
	console.log("sp500.getHistory() !!");

	ustrading.find().exec(function(err, tradings){
		if (err) {
			console.error(err);
		} 
		callback(err, tradings);
	});
}

// Find() - SP500 交易資料 特定日期之後
sp500.prototype.getHistoryByDate = function(startDate, endDate, callback) {

	let _stDate = moment(startDate, "YYYY-MM-DD");
	let _endDate = moment(endDate, "YYYY-MM-DD");

	// find date greater than start date, less than end date
	ustrading.find({"date": {"$gte": _stDate, "$lt": _endDate}}).exec(function(err, tradings){
		if (err) {
			console.error(err);
		} 
		callback(err, tradings);
	});

}

// export a instance of FED Funds Rate Operation
module.exports = new sp500();