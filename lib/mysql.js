
// mysql.js

var mysql = require('mysql');
var sqlRows; //data array from sql
var objs = []; // data array

//var conn = mysql.createConnection('mysql://root@localhost:3306/nodedb?debug=true');
//var conn = mysql.createConnection('mysql://myuser:12345@localhost:3306/nodedb');

var pool = null;

//closing all the connections in a pool
closePool = function(callback) {
	if(pool) {
		pool.end(function(err) {
			if(typeof callback === "function") {
				callback(err);
			}
		});
	}
};

exports.getConn = function(callback) {
	if(pool == null) {
		console.log("create connection pool is called!!");
		pool = mysql.createPool({
  		connectionLimit : 100,
  		host            : 'localhost',
  		port						: 3306,
  		user            : 'myuser',
  		password        : '12345',
  		database        : 'nodedb'
		});
	}
	if(pool) {
		pool.getConnection(function(err, conn) {
			callback(err, conn);
		});	
	}
};

exports.getCustomerList = function(coId, callback) {
	var queryStr = '';
	this.getConn(function (err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err,null);
		} else { // connected !!
			console.log("SQL Connected!!!");
			if (coId == 'ALL') {
				queryStr = 'SELECT * FROM compinfo';
			} else {
				queryStr = 'SELECT * FROM compinfo WHERE id = ?';	
			}
			console.log("query string is : " + queryStr + ", coID is : " + coId);
			conn.query(queryStr, [coId] , function(err, rows, fields) {
				conn.release(); // release connection after usage
				if(err) {
					if(typeof callback === "function") {
						callback(err,null);
					}
				} else {
					if(typeof callback === "function") {
						callback(err, rows);
					}
				}
			});
		}
	});
};

exports.delCustById = function(coId, callback) {
	this.getConn(function(err, conn) {
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else {
			console.log("SQL Connected!!!");
			conn.query('DELETE FROM compinfo WHERE id = ?', [coId], function(err, result) {
				conn.release();
				if(err) {
					console.log("SQL Delete Error Happened!!");
					console.log(err);
					callback(err);
				} 
			});
		}
		callback();
	});
};

exports.addNewCust = function(cust, callback) {
	this.getConn(function(err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else { // connected!!
			console.log("SQL Connected!!!");
			conn.query('INSERT INTO compinfo SET ?', cust, function(err, result) {
				conn.release(); // release connection after usage
			  if(err) {
			  	console.log("SQL Insertion Error Happened!!");
			  	console.log(err);
			  	callback(err);
			  }
			});
		}
		callback();
 	});
};

exports.updateCust = function(cust, callback) {
	this.getConn(function(err, conn) {
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else {
			console.log("SQL Connected!!!");
			conn.query('UPDATE compinfo SET comptype = ?, shortName = ?, name = ?, regAddr = ?, shpAddr = ?, ctPer = ?, tel = ?, fax = ?, mobilePh = ?, uniSn = ?, memo= ? WHERE ID = ?', 
								[cust.comptype, cust.shortName, cust.name, cust.regAddr, cust.shpAddr, cust.ctPer, cust.tel, cust.fax, cust.mobilePh, cust.uniSn, cust.memo, cust.id], 
				function(err, results) {
					conn.release(); // release connection after usage
				  if(err) {
				  	console.log("SQL Update Error Happened!!");
				  	console.log(err);
				  	callback(err);
				  }
				});
		}
		callback();
	});
};

exports.lookupItemById = function(itemId, callback) {
	var queryStr = '';
	this.getConn(function (err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
		} else {
			console.log("SQL Connected!!");
			if (itemId == 'ALL') {
				queryStr = 'SELECT * FROM iteminfo';
			} else {
				queryStr = 'SELECT * FROM itemId WHERE id = ?';	
			}
			console.log("query string is : " + queryStr + ", itemId is : " + itemId);
			conn.query(queryStr, [itemId] , function(err, rows, fields) {
				conn.release(); // release connection after usage
				if(err) {
					if(typeof callback === "function") {
						callback(err,null);
					}
				} else {
					if(typeof callback === "function") {
						callback(err, rows);
					}
				}
			});
		}
	});
};

exports.addNewItem = function(item, callback) {
	this.getConn(function(err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else { // connected!!
			console.log("SQL Connected!!!");
			conn.query('INSERT INTO iteminfo SET ?', item, function(err, result) {
				conn.release(); // release connection after usage
			  if(err) {
			  	console.log("SQL Insertion Error Happened!!");
			  	console.log(err);
			  	callback(err);
			  }
			});
		}
		callback();
 	});	
};

exports.updateItem = function(item, callback) {
	this.getConn(function(err, conn) {
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else {
			console.log("SQL Connected!!!");
			console.log("item data is : " + JSON.stringify(item));
			conn.query('UPDATE iteminfo SET name = ?, matl = ?, spec = ?, pp = ?, sp = ?, memo = ? WHERE id = ?', 
								[item.name, item.matl, item.spec, item.pp, item.sp, item.memo, item.id], 
				function(err, results) {
					conn.release(); // release connection after usage
				  if(err) {
				  	console.log("SQL Update Error Happened!!");
				  	console.log(err);
				  	callback(err);
				  }
				});
		}
		callback();
	});	
};

exports.delItemById = function(itemId, callback) {
	this.getConn(function(err, conn) {
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else {
			console.log("SQL Connected!!!");
			conn.query('DELETE FROM iteminfo WHERE id = ?', [itemId], function(err, result) {
				conn.release();
				if(err) {
					console.log("SQL Delete Error Happened!!");
					console.log(err);
					callback(err);
				} 
			});
		}
		callback();
	});
};

exports.getCustIdList = function(callback) {
	var queryStr = '';
	this.getConn(function (err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
		} else {
			queryStr = 'SELECT id, shortName, shpAddr FROM compinfo';	
			console.log("query string is : " + queryStr);
			conn.query(queryStr, function(err, rows, fields) {
				conn.release(); // release connection after usage
				if(err) {
					if(typeof callback === "function") {
						callback(err,null);
					}
				} else {
					if(typeof callback === "function") {
						callback(err, rows);
					}
				}
			});
		}
	});	
};

exports.addNewShpr = function(item, callback) {
	this.getConn(function(err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else { // connected!!
			console.log("SQL Connected!!!");
			conn.query('INSERT INTO shipper SET ?', item, function(err, result) {
				conn.release(); // release connection after usage
			  if(err) {
			  	console.log("SQL Insertion Error Happened!!");
			  	console.log(err);
			  	callback(err);
			  }
			});
		}
		callback();
 	});	
};

exports.getLatestShprSN = function(callback) {
	var queryStr = '';
	this.getConn(function (err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
		} else {
			queryStr = 'SELECT MAX(sn) FROM shipper';	
			console.log("query string is : " + queryStr);
			conn.query(queryStr, function(err, rows, fields) {
				conn.release(); // release connection after usage
				if(err) {
					if(typeof callback === "function") {
						callback(err,null);
					}
				} else {
					if(typeof callback === "function") {
						console.log("latest serial number is " + JSON.stringify(rows[0]));
						callback(err, rows[0]);
					}
				}
			});
		}
	});	
};

exports.addNewShprItem = function(shprItem, callback) {
	this.getConn(function(err, conn){
		if(err) {
			console.log("SQL Connection Failed!!");
			callback(err);
		} else { // connected!!
			console.log("SQL Connected!!!");
			conn.query('INSERT INTO shpritem SET ?', shprItem, function(err, result) {
				conn.release(); // release connection after usage
			  if(err) {
			  	console.log("SQL Insertion Error Happened!!");
			  	console.log(err);
			  	callback(err);
			  }
			});
		}
		callback();
 	});	
}

/*
//JSON Data Example
var records = { "records":[ {"Name":"Alfreds Futterkiste","City":"Berlin","Country":"Germany"}, 
														{"Name":"Ana Trujillo Emparedados y helados","City":"México D.F.","Country":"Mexico"}, 
														{"Name":"Antonio Moreno Taquería","City":"México D.F.","Country":"Mexico"}, 
														{"Name":"Around the Horn","City":"London","Country":"UK"}, 
														{"Name":"B's Beverages","City":"London","Country":"UK"}, 
														{"Name":"Berglunds snabbköp","City":"Luleå","Country":"Sweden"}, 
														{"Name":"Blauer See Delikatessen","City":"Mannheim","Country":"Germany"}, 
														{"Name":"Blondel père et fils","City":"Strasbourg","Country":"France"}, 
														{"Name":"Bólido Comidas preparadas","City":"Madrid","Country":"Spain"}, 
														{"Name":"Bon app'","City":"Marseille","Country":"France"}, 
														{"Name":"Bottom-Dollar Marketse","City":"Tsawassen","Country":"Canada"}, 
														{"Name":"Cactus Comidas para llevar","City":"Buenos Aires","Country":"Argentina"}, 
														{"Name":"Centro comercial Moctezuma","City":"México D.F.","Country":"Mexico"}, 
														{"Name":"Chop-suey Chinese","City":"Bern","Country":"Switzerland"}, 
														{"Name":"Comércio Mineiro","City":"São Paulo","Country":"Brazil"} ] };

*/