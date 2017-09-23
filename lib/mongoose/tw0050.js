'use strict';

// S&P500 個股日成交資訊 DB Operation Module

const mongoose = require('mongoose');
const moment = require('moment');

// 自訂 module
const mgConn = require('./mgConn');

const trading = require('./schema/trading'); // 載入 TWSE 個股日成交資訊 Schema/Model

// constructor
function tw0050 () {
	mgConn.init();
}

// 新增多筆 SP500 交易資料
tw0050.prototype.updateTradings = function(datas, options, callback) {
	console.log("tw0050.updateTradings() !!");
	console.log("total count is : " + datas.length);

	trading.insertMany(datas, function(err, doc) {
		if(err) {
		    console.log(err);
		    callback(err);
		}
	});

	callback(); // means ok and pass back 
}

// Find() - SP500 交易資料 全部
tw0050.prototype.getHistory = function(callback) {
	console.log("tw0050.getHistory() !!");

	trading.find().exec(function(err, tradings){
		if (err) {
			console.error(err);
		} 
		callback(err, tradings);
	});
}

// Find() - SP500 交易資料 特定日期之後
tw0050.prototype.getHistoryByDate = function(startDate, endDate, callback) {

	let _stDate = moment(startDate, "YYYY-MM-DD");
	let _endDate = moment(endDate, "YYYY-MM-DD");

	// find date greater than start date, less than end date
	// sort by date 
	trading.find({"date": {"$gte": _stDate, "$lt": _endDate}}).select('date cp').sort('date').exec(function(err, tradings){
		if (err) {
			console.error(err);
		} 
		callback(err, tradings);
	});

}

// export a instance of FED Funds Rate Operation
module.exports = new tw0050();