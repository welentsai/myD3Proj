const fs = require('fs');

const express = require('express');
const path = require("path");
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();



var fedFunds = require('./lib/routes/fedFunds');

// web server 

/** bodyParser.urlencoded(options)
 *  Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 *  and exposes the
 */
app.use(bodyParser.urlencoded({ extended: false })); 

/** bodyParser.json(options)
 *  Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

// set Morgan logger as a middleware
app.use(logger('dev'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use('/fedFunds', fedFunds);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("error handler is called !!!");
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
  //next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// listen port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


