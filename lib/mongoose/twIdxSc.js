'use strict';

// S&P500 個股日成交資訊 DB Operation Module

const mongoose = require('mongoose');
const moment = require('moment');

// 自訂 module
const mgConn = require('./mgConn');

const twIdx = require('./schema/twIdx'); // 載入 台灣景氣對策信號(分數) Schema/Model

// constructor
function twIdxSc () {
	mgConn.init();
}

// 新增多筆 台灣景氣對策信號(分數) 交易資料
twIdxSc.prototype.updateTradings = function(datas, options, callback) {

	console.log("twIdxSc.updateTradings() !!");
	console.log("total count is : " + datas.length);

	twIdx.insertMany(datas, function(err, doc) {
		if(err) {
		    console.log(err);
		    callback(err);
		}
	});

	callback(); // means ok and pass back 
}

// Find() - 台灣景氣對策信號(分數) 全部
twIdxSc.prototype.getHistory = function(callback) {
	console.log("twIdxSc.getHistory() !!");

	twIdx.find().exec(function(err, idxScores){
		if (err) {
			console.error(err);
		} 
		callback(err, idxScores);
	});
}

// Find() - 台灣景氣對策信號(分數) by Date
twIdxSc.prototype.getHistoryByDate = function(startDate, endDate, callback) {

	let _stDate = moment(startDate, "YYYY-MM-DD");
	let _endDate = moment(endDate, "YYYY-MM-DD");

	// find date greater than start date, less than end date
	// sort by date 
	twIdx.find({"date": {"$gte": _stDate, "$lt": _endDate}}).sort('date').exec(function(err, idxScores){
		if (err) {
			console.error(err);
		} 
		callback(err, idxScores);
	});

}

module.exports = new twIdxSc();