const moment = require('moment');
const express = require('express');
const router = express.Router();

// Mongoose Related
const mongoose = require('mongoose');

const db_exRate = require('../mongoose/exchange_rate.js');

const mgMgr = require('../dataFormatter/mgMgr.js');

router.post('/', function(req, res, next) {

  let _q = req.body; // get payload

  console.log(_q);
  let symbls = _q.symbl;

  let _startDate = _q.startYear + "-" + ("0" + _q.startMonth).slice(-2) + "-01";

  let _lastday = moment([_q.endYear, _q.endMonth-1]).endOf('month').date();
  let _endDate = _q.endYear + "-" + ("0" + _q.endMonth).slice(-2) + "-" + _lastday;

  console.log(_startDate);
  console.log(_endDate);

  mgMgr.getData(symbls, _startDate, _endDate, function (err, rows) {
    if(err) {
      console.log(err);
    } else {
      let _res = {
        status: 'ok',
        data: rows
      };
      res.json(_res);
    }
  });
  
});

module.exports = router;