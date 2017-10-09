
// Mongoose Related
const mongoose = require('mongoose');
const Q = require('q');

const db_exRate = require('../mongoose/exchange_rate');
const db_fedRate = require('../mongoose/fedFundOp');
const db_sp500 = require('../mongoose/sp500');
const db_tw0050 = require('../mongoose/tw0050');

// constructor - mongoose manager
function mgMgr () {
}

mgMgr.prototype.getData = function(symblist, startDate, endDate, callback) {

	// turn an array of promises into a promise for the whole
	let allPromise = Q.all([getExRate(startDate, endDate), getFedRate(startDate, endDate)]);

	allPromise
	.then(function successCb(results) {
		console.log("Success !!");
		callback(null, results);
	}, function errorCb(error) {
		console.log("Failure !!");
    console.log(error);
    callback(error);
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

// promise mechanism of get FED fund rate
function getFedRate(startDate, endDate) {
	let deferred = Q.defer();

	db_fedRate.getHistoryByDate(startDate, endDate, function (err, rows) {
		if(err) {
			deferred.reject(err);
		} else {
			deferred.resolve(rows);	
		}
	});

	return deferred.promise;
}


module.exports = new mgMgr();
