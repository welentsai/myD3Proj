
const moment = require('moment');

const Series = require('pandas-js').Series;
const DataFrame = require('pandas-js').DataFrame;

const mgMgr = require('./lib/dataFormatter/mgMgr');

let symbls = ['FedRate', 'exRate', 'SP500', 'TW50'];
// let symbls = ['FedRate'];
//let symbls = ['exRate'];
let _startDate = '2017-01-01';
let _endDate = '2017-10-31';


mgMgr.getData(symbls, _startDate, _endDate, function (err, rows) {
  if(err) {
    console.log(err);
  } else {

  	for(let i = 0; i < rows.length; i++) {
  		console.log(rows[i].tag);
  	}

    // if(rows[0].fedRate.length > 0 ) {
    // 	let rowList = [];
    	
    // 	for(let i = 0; i < rows[0].fedRate.length; i++) {
    // 		let row = {
    // 			date: moment(rows[0].fedRate[i].date).format('YYYY-MM-DD'),
    // 			rate: rows[0].fedRate[i].rate
    // 		};	
    // 		console.log(i);
    // 		rowList.push(row);
    // 	}
    // 	const df = new DataFrame(rowList);
    // 	console.log(df.toString());
    // }
  }
});