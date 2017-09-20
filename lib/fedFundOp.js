const mongoose = require('mongoose');

// 自訂 module
const mgLib = require('./mgLib.js');

const fedFund = require('./mongoose/fedFund.js'); // 載入 美國聯邦基金匯率 Model

// constructor
function fedFundOPs () {
	mgLib.init();
}

// 新增多筆 美國聯邦基金匯率 資料
fedFundOPs.prototype.updateFedFund = function(datas, options, callback) {
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

// export a instance of FED Funds Rate Operation
module.exports = new fedFundOPs();