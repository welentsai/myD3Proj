
// mongoose connection to mLab Database

'use strict';

// mongoose 4.11.11
const mongoose = require('mongoose');

// mongoose modal
const rate = require('./mongoose/rate.js'); // 載入 exchange rate Model
const trading = require('./mongoose/trading.js'); // 載入 台股 日成交資訊 Model
const ustrading = require('./mongoose/us_trading.js'); // 載入 美股 日成交資訊 Model
const twIdx = require('./mongoose/twIdx.js'); // 載入 台灣景氣對策信號 Model
const twCap = require('./mongoose/twCap.js'); // 載入 台灣台股上市公司當月總市值 Model
const twM1b = require('./mongoose/twM1b.js'); // 載入 M1B 貨幣總計數 Model
const fedFund = require('./mongoose/fedFund.js'); // 載入 美國聯邦基金匯率 Model

// mongoose 及 mLab 連線參數
const mongodbUri = 'mongodb://welen:welen88@ds064198.mlab.com:64198/welendb';

const options = { keepAlive: true,
                reconnectTries: Number.MAX_VALUE,
				useMongoClient: true};

const db = mongoose.connection;

// constructor
function mongooseLib () {
	this.isInitialized = false;
}

// 初始化
// Node.js 環境中
// 利用 require()取得的module, 如果是同一檔案, 將會回傳同一 Object
// 所有的 Isntances 將會指向同一個 Object
mongooseLib.prototype.init = function() {
	// 利用 mongoose 建立default連線
	if (! this.isInitialized) {
		console.log("building up mongodb connection ....");
        
		mongoose.connect(mongodbUri, options);

		//Bind connection to error event (to get notification of connection errors)
		db.on('error', console.error.bind(console, 'MongoDB connection error:'));

		db.once('open', function() {
		  // we're connected!
		  console.log("mLab MongoDB Connected !");
		});
	}
	this.isInitialized = true;
}

mongooseLib.prototype.updateRates = function(datas, options, callback) {

    console.log("updateRates !!");

    console.log("total count is : " + datas.length);

    rate.insertMany(datas, function(err, doc) {
    	if(err) {
    		console.log(err);
    		callback(err);
    	}
    });

    callback(); // means ok and pass back 
}

mongooseLib.prototype.findLastRate = function(callback) {

    console.log("findLastRate() !!");

    // using Mongoose Query Builder
    // -id => to find the newest
    // id => to find the oldest
    rate.findOne().sort('-date').exec(function (err, row) {
        if(err) {
            console.error(err);
        }
        //console.log(JSON.stringify(row));
        callback(err, row);
    });
}

// 新增多筆 0050 交易資料
mongooseLib.prototype.updateTradings = function(datas, options, callback) {

    console.log("updateTradings !!");

    console.log("total count is : " + datas.length);

    trading.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });

    callback(); // means ok and pass back 
}

// 新增多筆 S&P 500 交易資料
mongooseLib.prototype.updateUSTradings = function(datas, options, callback) {

    console.log("updateUSTradings !!");

    console.log("total count is : " + datas.length);

    ustrading.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });

    callback(); // means ok and pass back 
}

// 新增多筆 台灣景氣燈號資料
mongooseLib.prototype.updateTwIdx = function(datas, options, callback) {

    console.log("updateTwIdx !!");

    console.log("total count is : " + datas.length);

    twIdx.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });
    callback(); // means ok and pass back 
}

// 新增多筆 台灣台股上市公司當月總市值 資料
mongooseLib.prototype.updateTwCap = function(datas, options, callback) {

    console.log("updateTwCap !!");

    console.log("total count is : " + datas.length);

    twCap.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });
    callback(); // means ok and pass back 
}

// 新增多筆 M1B 貨幣總計數 (= M1A ＋ 活期儲蓄存款) 資料
mongooseLib.prototype.updateTwM1b = function(datas, options, callback) {

    console.log("updateTwM1b !!");

    console.log("total count is : " + datas.length);

    twM1b.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });
    callback(); // means ok and pass back 
}

// 新增多筆 美國聯邦基金匯率 資料
mongooseLib.prototype.updateFedFund = function(datas, options, callback) {
    console.log("updateFedFund !!");
    console.log("total count is : " + datas.length);

    fedFund.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });
    callback(); // means ok and pass back 
}

// export a instance of mongooseLib
module.exports = new mongooseLib();