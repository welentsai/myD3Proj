
// Mongoose Related
const mongoose = require('mongoose');
const Q = require('q');

const db_exRate = require('../mongoose/exchange_rate');
const db_fed = require('../mongoose/fedFundOp');
const db_sp500 = require('../mongoose/sp500');
const db_tw0050 = require('../mongoose/tw0050');

// constructor - mongoose manager
function mgMgr () {
}

mgMgr.prototype.getData = function(symblist, startDate, endDate, callback) {

	getExRate(startDate, endDate)
	.then(function successCb(response) {
		console.log("Success !!");
		callback(null, response);
	}, function errorCb(error) {
		console.log("Failure !!");
    console.log(error);
	});
}

// promise mechanism of get exchange rate
function getExRate(startDate, endDate) {
	let deferred = Q.defer();

	db_exRate.getHistoryByDate(startDate, endDate, function (err, rows) {
		if(err) {
			deferred.reject(err);
		} else {
			deferred.resolve(rows);	
		}
	});

	return deferred.promise;
}

module.exports = new mgMgr();
