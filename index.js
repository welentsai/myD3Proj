const fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path    = require("path");
var dbctrlr = require("./lib/mysql.js");

var sqlRows; //data array from sql
var objs = []; // data array


// web server 

/** bodyParser.urlencoded(options)
 *  Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 *  and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({ extended: true })); 

/** bodyParser.json(options)
 *  Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json())

app.get('/', function (req, res) {
  //console.log(path.join(__dirname+'/index.html'));
  //console.log(req);
  res.send('Hello World!');
  //res.write(JSON.stringify(anObject));  //return a JSON object
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.post('/lookupcustid', function (req, res) {
	console.log("look up customer id is gotten!!");
	console.log("custid value is : " + req.body.custid);
	dbctrlr.getCustomerList(req.body.custid, function(err, rows) {
		if(err) {
			console.log("Failed to read data from DB!!!");
			console.log(err);
		} else {
			console.log("Successed to read data from DB!!!");
			res.json(rows);
		}
		res.end();
	});
});

app.post('/addNewCust', function (req, res) {
	console.log("add new customer is gotten!!");
	console.log("customer data is : " + JSON.stringify(req.body));
	dbctrlr.addNewCust(req.body, function(err) {
		if(err) {
			console.log("Failed to insert data from DB!!!");
		} 
		res.end();
	});
});

app.post('/updateCust', function (req,res) {
	console.log("update customer is gotten!!");
	console.log("customer data is : " + JSON.stringify(req.body));
	dbctrlr.updateCust(req.body, function(err) {
		if(err) {
			console.log("Failed to update data in DB!!!");
		} 
		res.end();
	});
});

app.post('/delCustById', function (req, res) {
	console.log("delete customer is gotten!!");
	console.log("customer data is : " + JSON.stringify(req.body.custid));
	dbctrlr.delCustById(req.body.custid, function(err) {
		if (err) {
			console.log("Failed to delete data in DB!!!");
		}
		res.end();
	});
});

app.post('/lookupItemById', function(req, res){
	console.log("lookupItemById() is gotten!!");
	dbctrlr.lookupItemById(req.body.id, function(err, rows) {
		if (err) {
			console.log("Failed to look up items in DB!!!");
		} else {
			console.log("Successed to read items from DB!!!");
			res.json(rows);
		}
		res.end();
	});
});

app.post('/updateItem', function(req, res){
	console.log("updateItem() is called");
	dbctrlr.updateItem(req.body, function(err) {
		if(err) {
			console.log("Failed to update data in DB!!!");
		} 
		res.end();
	});
});

app.post('/addNewItem', function(req,res){
	console.log("addNewItem() is called");
	dbctrlr.addNewItem(req.body, function(err) {
		if(err) {
			console.log("Failed to insert item from DB!!!");
		} 
		console.log("going to end response");
		res.end();
	});
});

app.post('/delItemById', function(req,res){
	console.log("delItemById() is called");
	dbctrlr.delItemById(req.body.id, function(err) {
		if(err) {
			console.log("Failed to insert item from DB!!!");
		} 
		res.end();
	});
});

app.post('/getCustIdList', function(req,res){
	console.log("getCustIdList() is called");
	dbctrlr.getCustIdList(function(err, rows) {
		if (err) {
			console.log("Failed to look up items in DB!!!");
		} else {
			console.log("Successed to read items from DB!!!");
			res.json(rows);
		}
		res.end();
	});
});

app.post('/addNewShpr', function(req,res){
	console.log("addNewShpr() is called");
	dbctrlr.addNewShpr(req.body, function(err) {
		if(err) {
			console.log("Failed to insert shipper to DB!!!");
		} 
		console.log("going to end response");
		res.end();
	});
});

app.post('/getLatestShprSN', function(req,res){
	console.log("getLatestShprSN() is called");
	dbctrlr.getLatestShprSN(function(err, rows) {
		if (err) {
			console.log("Failed to look up items in DB!!!");
		} else {
			console.log("Successed to read items from DB!!!");
			res.json(rows);
		}
		res.end();
	});
});

app.post('/addNewShprItem', function(req,res){
	console.log("addNewShprItem() is called");
	dbctrlr.addNewShprItem(req.body, function(err) {
		if(err) {
			console.log("Failed to insert item from DB!!!");
		} 
		console.log("going to end response");
		res.end();
	});
});


// for 複製資料庫
// get "客戶資料"
app.post('/getRCHMA', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161121134754-RCHMA-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMA is called!!");
});

// get "訂單單頭"
app.post('/getRCHMB', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123105516-RCHMB-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMB is called!!");
});

// get "訂單單身"
app.post('/getRCHMC', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123113534-RCHMC-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMC is called!!");
});

// get "料件資料"
app.post('/getRCHMD', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123131053-RCHMD-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMD is called!!");
});

// get "廠商資料"
app.post('/getRCHME', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123131243-RCHME-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHME is called!!");
});

// get "採購單單頭"
app.post('/getRCHMF', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123154338-RCHMF-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMF is called!!");
});

// get "採購單單身"
app.post('/getRCHMG', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123154538-RCHMG-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMG is called!!");
});

// get "流水帳科目"
app.post('/getRCHMH', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123154723-RCHMH-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMH is called!!");
});

// get "流水帳明細"
app.post('/getRCHMI', function (req, res) {
	// Read file in synchronously (blocking)
	var contents = fs.readFileSync('richengFiles/20161123154915-RCHMI-utf8.txt', 'utf8');
  res.send(contents);
  //res.end();
  console.log("getRCHMI is called!!");
});


// listen port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('public'));
app.use(express.static('public/test'));

