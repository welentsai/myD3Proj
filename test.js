
// STOCK-AI.COM: 投資級經濟指標使用指南
// 美國聯邦基金匯率

const request = require('request');
const cheerio = require('cheerio');
var moment = require('moment');

// 自訂 module
const db = require('./lib/mongoose/fedFundOp.js');

const uri = "https://stock-ai.com/eomDataQuery";

function getPayload(sblCode, stYr, stM, eYr, eM) {
	return {
		form: {
			a:"c",
			showType:"Value",
			symbolCode:sblCode,
			startYear:stYr,
			startMonth:stM,
			endYear:eYr,
			endMonth:eM,
			hash:"d41d8cd98f00b204e9800998ecf8427e"	
		}	
	};
}

function getDate(date) {
	//console.log(date);
	//return moment(date, "YYYY-MM-DD").format('YYYY-MM-DD').toString();
	return moment(date, "YYYY-MM-DD").format('YYYY-MM-DD');
}

let payload = getPayload("FEDFUNDS", 1990, 1, 2017, 8);
let dataL = [];

request.post(uri, payload, function(error, response, jsonStr) {

	if (!error && response.statusCode == 200) {
		let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
		for(let i = 0; i < content.rows.length; i++) {
			let _row = {
				date: getDate(content.rows[i].sDate), // date
				rate: content.rows[i].sPrice 
			};
			//console.log(_row);	
			dataL.push(_row);
		}

    db.updateFedFund(dataL, {upsert:true}, function(err) {
      if(err) {
        console.log("update Fed Funds Rate error !!");
      } else {
        console.log("update Fed Funds Rate successfully !!");
      }
    });
	}
});