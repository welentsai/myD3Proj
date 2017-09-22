
var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);

// config myApp
myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

});

// main control here
myApp.controller('mainCtrl', function($scope, $http){
	console.log("Main control is taking care");

	$scope.rates = [];

	function getDate(d) {
		return moment(d, "YYYY-MM-DD").format('YYYY-MM-DD');
	}

	function formateData(dataList) {
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

	$scope.getFedFundsRate = function() {
		console.log("getFedFundsRate() !!");

		$http.get("/fedFunds/rates")
		.then(function successCallback(response) {
			//console.log("getFedFundsRate() OK , response is : " +  angular.toJson(response.data));
			formateData(response.data.data);
			//$scope.rates = response.data.data;
		}, function errorCallback(response) {
			console.log("getFedFundsRate() fail");
		});
	}

	$scope.draw = function() {
		console.log("draw() !!");

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

    // row conversion function -> to map and filter row objects to a more-specific representation
    function rowFunc(d) {
      d.date = parseTime(d.date);
      d.rate = +d.rate; // convert string to number
      console.log(JSON.stringify(d));
      return d;
    }

    let data = $scope.rates;

    //if(data.length === 0) throw error;

    // go through all d.date and d.rate
    x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));
    y.domain(d3.extent(data, function(d) { return d.rate; }));

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
        .datum(data)
        //.data(data) 
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // 建立一個 g element
    const focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none"); // invisible element

    // SVG circle
    focus.append("circle")
        .attr("r", 4.5);

    // SVG text
    focus.append("text")
        .attr("x", 9)
        .attr("dy", ".35em");
        
    // SVG rect element
    g.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousemove", mousemove);

    function mouseover () {
      focus.style("display", null);
    }

    function mouseout() {
      focus.style("display", "none");
    }

    function mousemove() {
      console.log("mousemove");
      var x0 = x.invert(d3.mouse(this)[0]), // 取得 mouse over 的 x-scale value (時間座標值)
          i = bisectDate(data, x0, 1), // 取得x軸坐標 => 相對應排序好的原始資料的index值
          d0 = data[i - 1], // 取得 原始資料[idx-1]
          d1 = data[i], // 取得 原始資料[idx]
          d = x0 - parseTime(d0.date) > parseTime(d1.date) - x0 ? d1 : d0; // 看游標比較靠近 d0 或 d1
      focus.attr("transform", "translate(" + x(parseTime(d.date)) + "," + y(d.rate) + ")");
      focus.select("text").text(d.date + " " + formatCurrency(d.rate));
    }

	}

	$scope.getSP500 = function() {
		console.log("getSP500() !!");

		let _query = {
			op: "SP500",  // operation
			startYear: "2015",
			startMonth: "01",
			endYear: "2017",
			endMonth: "09"
		};

		$http.post("/sp500/history", angular.toJson(_query))
		.then(function successCallback(response) {
			console.log("Success !!");
			if(response.statusText === 'OK') {
				console.log(angular.toJson(response.data.data));
			}
		}, function errorCallback(response) {
			console.log("Fail !!");
			console.log("Error is " + angular.toJson(response));
		});
	}

	$scope.drawSP500 = function() {
		console.log("drawSP500() !!");

	}
});