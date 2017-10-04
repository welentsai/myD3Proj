'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

// 自訂 module
const mgConn = require('./mgConn');
const exRate = require('./schema/rate'); // 載入 台幣匯率 Schema/Model

// constructor
function exchangeRate () {
	mgConn.init();
}

// 新增多筆 台幣匯率 資料
exchangeRate.prototype.updateExRate = function(datas, options, callback) {
    console.log("exchangeRate -> updateExRate !!");
    console.log("total count is : " + datas.length);

    exRate.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
        callback(err, doc); 
    });
}

// Find() - 台幣匯率 資料
exchangeRate.prototype.getRates = function(callback) {
    console.log("exchangeRate -> getRates !!");

    exRate.find().exec(function(err, exRates){
        if (err) {
            console.error(err);
        } 
        callback(err, exRates);
    });
}

exchangeRate.prototype.getHistoryByDate = function(startDate, endDate, callback) {

    console.log("exchangeRate -> getHistoryByDate !!");

    let _stDate = moment(startDate, "YYYY-MM-DD");
    let _endDate = moment(endDate, "YYYY-MM-DD");

    // find date greater than start date, less than end date
    // sort by date 
    exRate.find({"date": {"$gte": _stDate, "$lt": _endDate}}).select('date sightBuy sightSell').sort('date').exec(function(err, exRates){
        if (err) {
            console.error(err);
        } 
        callback(err, exRates);
    });
}

module.exports = new exchangeRate();