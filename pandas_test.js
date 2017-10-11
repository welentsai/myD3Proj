

const Series = require('pandas-js').Series;
const DataFrame = require('pandas-js').DataFrame;

const mgMgr = require('./lib/dataFormatter/mgMgr');

// let symbls = ['FedRate', 'exRate', 'SP500', 'TW50'];
let symbls = ['FedRate'];
let _startDate = '2017-01-01';
let _endDate = '2017-10-31';


mgMgr.getData(symbls, _startDate, _endDate, function (err, rows) {
  if(err) {
    console.log(err);
  } else {
    // let _res = {
    //   status: 'ok',
    //   data: rows
    // };

    // console.log(rows[0].fedRate);
    // const ds_1 = new Series([1, 2, 3, 4], {name: 'My Data 1'});
    const df = new DataFrame(rows[0].fedRate);
    console.log(df.toString());
  }
});