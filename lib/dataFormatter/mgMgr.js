
// Mongoose Related
const mongoose = require('mongoose');
const Q = require('q');

const db_exRate = require('../mongoose/exchange_rate');
const db_fedRate = require('../mongoose/fedFundOp');
const db_sp500 = require('../mongoose/sp500');
const db_tw50 = require('../mongoose/tw0050');

// constructor - mongoose manager
function mgMgr () {
}

mgMgr.prototype.getData = function(symblist, startDate, endDate, callback) {

	// valid operation => 'exRate', 'FedRate', 'SP500', 'TW50'

	let promises = [];

	// deal with the symbol <=> operation
	for(let i = 0; i < symblist.length; i++) {
		if(symblist[i] === 'exRate') {
			promises.push(getExRate(startDate, endDate));
		} else if(symblist[i] === 'FedRate') {
			promises.push(getFedRate(startDate, endDate));
		} else if(symblist[i] === 'SP500') {
			promises.push(getSP500(startDate, endDate));
		} else if(symblist[i] === 'TW50') {
			promises.push(getTW50(startDate, endDate));
		}
	}

	// turn an array of promises into a promise for the whole
	Q.all(promises)
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
			let _result = {
				tag: 'exRate', 
				data: rows
			};
			deferred.resolve(_result);
			//deferred.resolve(rows);
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
			let _result = {
				tag: 'FedRate', 
				data: rows
			};
			deferred.resolve(_result);
			//deferred.resolve(rows);	
		}
	});

	return deferred.promise;
}

// promise mechanism of get S&P 500 Historical
function getSP500(startDate, endDate) {
	let deferred = Q.defer();

	db_sp500.getHistoryByDate(startDate, endDate, function (err, rows) {
		if(err) {
			deferred.reject(err);
		} else {
			let _result = {
				tag: 'SP500', 
				data: rows
			};
			deferred.resolve(_result);
			//deferred.resolve(rows);	
		}
	});

	return deferred.promise;
}

// promise mechanism of get TWSE 0050 Historical
function getTW50(startDate, endDate) {
	let deferred = Q.defer();

	db_tw50.getHistoryByDate(startDate, endDate, function (err, rows) {
		if(err) {
			deferred.reject(err);
		} else {
			let _result = {
				tag: 'TW50', 
				data: rows
			};
			deferred.resolve(_result);
			//deferred.resolve(rows);	
		}
	});

	return deferred.promise;
}


module.exports = new mgMgr();
