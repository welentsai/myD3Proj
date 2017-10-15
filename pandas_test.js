
const moment = require('moment');

const Series = require('pandas-js').Series;
const DataFrame = require('pandas-js').DataFrame;

const mgMgr = require('./lib/dataFormatter/mgMgr');

// let symbls = ['FedRate', 'exRate', 'SP500', 'TW50'];
let symbls = ['TW50'];
// let symbls = ['FedRate', 'exRate'];
let _startDate = '2017-01-01';
let _endDate = '2017-10-31';


mgMgr.getData(symbls, _startDate, _endDate, function (err, rows) {
  if(err) {
    console.log(err);
  } else {

  	for(let i = 0; i < rows.length; i++) {
  		console.log(rows[i].tag);
      switch(rows[i].tag) {
        case 'fedRate':
          const df1 = new DataFrame(getFedRateList(rows[i].data));
          console.log(df1.toString());  
          break;
        case 'exRate':
          const df2 = new DataFrame(getExRate(rows[i].data));
          console.log(df2.toString()); 
          break;
        case 'sp500':
          const df3 = new DataFrame(getSP500(rows[i].data));
          console.log(df3.toString()); 
          break;
        case 'tw50':
          const df4 = new DataFrame(getTW50(rows[i].data));
          console.log(df4.toString()); 
          break;
        default:
          console.log("No matching tags : " + rows[i].tag);
      }
  	}
  }
});

function getFedRateList(data) {
  let rowList = [];

  for(let i = 0; i < data.length; i++) {
    let row = {
      date: moment(data[i].date).format('YYYY-MM-DD'),
      rate: data[i].rate
    };  
    rowList.push(row);
  }

  return rowList;
}

function getExRate(data) {
  let rowList = [];
  for(let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    let row = {
      date: moment(data[i].date).format('YYYY-MM-DD'),
      cp: (((+data[i].sightBuy) + (+data[i].sightSell)) / 2).toFixed(3) // 小數點3位
    };  
    rowList.push(row);
  }
  return rowList;
}

function getSP500(data) {
  let rowList = [];

  for(let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    let row = {
      date: moment(data[i].date).format('YYYY-MM-DD'),
      cp: data[i].cp.replace(/\,/g,'') // remove comma(,) from number
    };  
    rowList.push(row);
  }
  return rowList; 
}

function getTW50(data) {
  let rowList = [];
  for(let i = 0; i < data.length; i++) {
    //console.log(data[i]);
    let row = {
      date: moment(data[i].date).format('YYYY-MM-DD'),
      cp: data[i].cp.replace(/\,/g,'') // remove comma(,) from number
    };  
    rowList.push(row);
  }
  return rowList;
}