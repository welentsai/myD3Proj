'use strict';

const moment = require('moment');
const express = require('express');
const router = express.Router();

// Mongoose Related
const mongoose = require('mongoose');

const db = require('../mongoose/sp500.js');

router.get('/', function(req, res, next) {
  console.log("S&P500 Root handler is called !!!");
  res.send('S&P500 Root');
});

router.get('/history', function(req, res, next) {
  db.getHistory(function (err, rows) {
    if(err) {
      console.log(err); 
    } else {
      let _res = {
        status: 'ok',
        data: rows
      }
      res.json(_res);  
    }
  });
});


router.post('/history', function(req, res, next) {

  let _q = req.body;
  console.log(_q);
  let _startDate = _q.startYear + "-" + _q.startMonth + "-01";
  let _endDate = _q.endYear + "-" + _q.endMonth + "-" + moment().date();

  console.log(_startDate);
  console.log(_endDate);

  // let _res = {
  //   status: 'ok',
  //   data: _q
  // }
  // res.json(_res);  

  db.getHistoryByDate(_startDate, _endDate, function (err, rows) {

    if(err) {
      console.log(err); 
    } else {
      let _res = {
        status: 'ok',
        data: rows
      }
      res.json(_res);  
    }

  });

});

module.exports = router;


