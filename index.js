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
app.use(bodyParser.urlencoded({ extended: false })); 

/** bodyParser.json(options)
 *  Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  //console.log(path.join(__dirname+'/index.html'));
  //console.log(req);
  //res.send('Hello World!');
  //res.write(JSON.stringify(anObject));  //return a JSON object
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
  //next(err);
});

// listen port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

