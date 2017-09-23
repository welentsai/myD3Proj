'use strict';

const moment = require('moment');
const express = require('express');
const router = express.Router();

// Mongoose Related
const mongoose = require('mongoose');

const db = require('../mongoose/tw0050');

router.get('/', function(req, res, next) {
  console.log("TWSE 0050 Root handler is called !!!");
  res.send('TWSE 0050 Root');
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


