// Data Manager controller here
myApp.controller('dataMgrCtrl', function($scope, $q, $http, $uibModal, $location){
  console.log("dataMgrCtrl is taking care");

  // checkBox 初始化
  $scope.fedFundRate = false;
  $scope.exRate = false;
  $scope.sp500 = false;
  $scope.tw50 = false;

  // 初始化
  $scope.rates = []; // fed fund rate list
  $scope.exRates = []; // 台幣匯率
  $scope.sp500es = [];
  $scope.tw0050es = [];
  $scope.twIdxSces = []; // 台灣景氣對策信號(分數) List

  // 初始化 - date picker format list
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];  // default date format

  $scope.popupDP_StartDate = {
    opened: false
  };

  $scope.popupDP_EndDate = {
    opened: false
  };

  // 開啟 date picker
  $scope.opendp_StartDate = function() {
    //console.log("popup datepicker is called!!");
    $scope.popupDP_StartDate.opened = true;
  }

  $scope.opendp_EndDate = function() {
    //console.log("popup datepicker is called!!");
    $scope.popupDP_EndDate.opened = true;
  }

  $scope.draw = function() {
    console.log('draw()');
    // console.log("Start Date : " + $scope.startDate);
    // console.log("End Date : " + $scope.endDate);

    if(typeof $scope.startDate == 'undefined' || $scope.startDate == null) return;
    if(typeof $scope.endDate == 'undefined' || $scope.endDate == null) return;

    console.log("not empty check : pass !!");

    if($scope.fedFundRate) {
      let stDate = moment($scope.startDate, "YYYY/MM/DD");
      let edDate = moment($scope.endDate, "YYYY/MM/DD");
      getFedFundsRate(stDate.year(), stDate.month()+1, edDate.year(), edDate.month()+1)
      .then(function successCallback(response) {
        console.log(response);
        drawFedRate($scope.rates);
      }, function errorCallback(error) {
        console.log(error);
      });
    }

    if($scope.exRate) {
      let stDate = moment($scope.startDate, "YYYY/MM/DD");
      let edDate = moment($scope.endDate, "YYYY/MM/DD");
      getExchangeRate(stDate.year(), stDate.month()+1, edDate.year(), edDate.month()+1)
      .then(function successCallback(response) {
        console.log(response);
        drawFedRate($scope.exRates);
      }, function errorCallback(error) {
        console.log(error);
      });
    }
  }

  $scope.cancel = function() {
    $scope.startDate = null;
    $scope.endDate = null;
  }

  function drawFedRate(rateList) {

    let stDate = moment($scope.startDate, "YYYY/MM/DD");
    let edDate = moment($scope.endDate, "YYYY/MM/DD");

    const svg = d3.select("svg"),
          margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Convert to D3 時間格式 
    const parseTime = d3.timeParse("%Y-%m-%d");

    // 1. specifies to use the bisectLeft option 
    // 2. return a suitable index for the insertion of an element assuming the array is sorted
    const bisectDate = d3.bisector(function(d) { return parseTime(d.date); }).left;

    const formatValue = d3.format(",.2f"),  // 數字格式, .2f => 小數點後2位
          formatCurrency = function(d) { return formatValue(d) + "%"; };

    // d3.scaleTime() -> create a linear scale for time
    // rangeRound() -> set the output range and enable rounding
    const x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
    .rangeRound([height, 0]);  // 注意, range 是 [height, 0]

    // d3.line() -> create a new line generator
    var line = d3.line()
        .x(function(d) { return x(parseTime(d.date)); })
        .y(function(d) { return y(d.rate); });

    // d3.extent => Returns the MIN and MAX value in the given array
    x.domain([parseTime(stDate.format('YYYY-MM-DD')), parseTime(edDate.format('YYYY-MM-DD'))]);
    y.domain(d3.extent(rateList, function(d) { return d.rate; }));

    // 繪出 x-軸
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // 繪出 y-軸
    g.append("g")
        .call(d3.axisLeft(y))
      .append("text") // append a <text> element
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Rate (%)");

    // 繪出 匯率線
    g.append("path")
        .datum(rateList)
        //.data(data) 
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);
  }

  function getDate(d) {
    return moment(d, "YYYY-MM-DD").format('YYYY-MM-DD');
  }

  function getExchangeRate(stYr, stM, endYr, endM) {
    // 利用 $q 的 promise機制包裝 getFedFundsRate()
    let deferred = $q.defer();

    let _query = {
      op: "FedRate",  // operation
      startYear: stYr,
      startMonth: stM,
      endYear: endYr,
      endMonth: endM
    };

    $http.post("/exchangeRate/rates", angular.toJson(_query))
    .then(function successCallback(response) {
      //console.log("getFedFundsRate() OK , response is : " +  angular.toJson(response.data));
      formatExRate(response.data.data);
      deferred.resolve("Success");
    }, function errorCallback(response) {
      console.log("getFedFundsRate() fail");
      deferred.reject(response);
    });

    // promise is returned
    return deferred.promise;
  }

  function getFedFundsRate(stYr, stM, endYr, endM) {

    // 利用 $q 的 promise機制包裝 getFedFundsRate()
    let deferred = $q.defer();

    console.log("getFedFundsRate() !!");

    let _query = {
      op: "FedRate",  // operation
      startYear: stYr,
      startMonth: stM,
      endYear: endYr,
      endMonth: endM
    };

    $http.post("/fedFunds/rates", angular.toJson(_query))
    .then(function successCallback(response) {
      //console.log("getFedFundsRate() OK , response is : " +  angular.toJson(response.data));
      formatFedRate(response.data.data);
      deferred.resolve("Success");
    }, function errorCallback(response) {
      console.log("getFedFundsRate() fail");
      deferred.reject(response);
    });

    // promise is returned
    return deferred.promise;
  }

  // FED 利率 資料整理, 並放入 $scope.rates
  function formatFedRate(dataList) {
    for(let i = 0; i < dataList.length; i++) {
      //console.log(dataList[i].date + " , " + dataList[i].rate);
      let _d = {
        date: getDate(dataList[i].date),
        rate: +dataList[i].rate // convert String to Number
      }
      //console.log(_d);
      $scope.rates.push(_d);
    }
    console.log($scope.rates.length);
    console.log($scope.rates);
  }

  // 整理台幣匯率
  function formatExRate(dataList) {
    for(let i = 0; i < dataList.length; i++) {
      //console.log(dataList[i]);
      let _d = {
        date: getDate(dataList[i].date),
        rate: (((+dataList[i].sightBuy) + (+dataList[i].sightSell))/2).toPrecision(5)  // convert String to Number
      }
      //console.log(_d);
      $scope.exRates.push(_d);
    }
    console.log($scope.exRates.length);
    console.log($scope.exRates);
  }


});