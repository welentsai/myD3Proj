'use strict';

const mongoose = require('mongoose');

// 自訂 module
const mgConn = require('./mgConn.js');
const fedFund = require('./schema/fedFund.js'); // 載入 美國聯邦基金匯率 Schema/Model

// constructor
function fedFundOPs () {
	mgConn.init();
}

// 新增多筆 美國聯邦基金匯率 資料
fedFundOPs.prototype.updateFedFund = function(datas, options, callback) {
    console.log("fedFundOPs -> updateFedFund !!");
    console.log("total count is : " + datas.length);

    fedFund.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });
    callback(); // means ok and pass back 
}

// Find() - 美國聯邦基金匯率 資料
fedFundOPs.prototype.getFedFunds = function(callback) {
    console.log("fedFundOPs -> getFedFunds !!");

    fedFund.find().exec(function(err, fundRates){
        if (err) {
            console.error(err);
        } 
        callback(err, fundRates);
    });
}

// export a instance of FED Funds Rate Operation
module.exports = new fedFundOPs();