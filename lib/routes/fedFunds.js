
const express = require('express');
const router = express.Router();

// Mongoose Related
const mongoose = require('mongoose');

const db = require('../mongoose/fedFundOp.js');

router.get('/', function(req, res, next) {
  console.log("Fed Fund Root handler is called !!!");
  res.send('respond with a resource');
});

router.get('/rates', function(req, res, next) {

  db.getFedFunds(function (err, rows) {
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


