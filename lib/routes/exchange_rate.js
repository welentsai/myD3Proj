'use strict';

const moment = require('moment');
const express = require('express');
const router = express.Router();

// Mongoose Related
const mongoose = require('mongoose');

const db = require('../mongoose/exchange_rate.js');

router.get('/', function(req, res, next) {
  console.log("Fed Fund Root handler is called !!!");
  res.send('respond with a resource');
});

router.get('/rates', function(req, res, next) {

  db.getRates(function (err, rows) {
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

router.post('/rates', function(req, res, next) {

  let _q = req.body;
  console.log(_q);

  let _startDate = _q.startYear + "-" + _q.startMonth + "-01";
  let _endDate = _q.endYear + "-" + _q.endMonth + "-" + moment().date();

  console.log(_startDate);
  console.log(_endDate);

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


