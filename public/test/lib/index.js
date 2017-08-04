
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {

	$scope.custList = [];
	$scope.supplList = [];
	$scope.shprList = [];
	$scope.shprDetailList = [];
	$scope.itmList = [];

	// get "客戶資料"
	$scope.getCustInfo = function() {

		console.log("getCustInfo() is called");
		$http.post("/getRCHMA")
		.then(function successCallback(response) {
			//First function handles success
			//console.log("response is : " + response.data);
			var lines = response.data.split('\n');
			for(var line = 0; line < lines.length; line++){
				if(lines[line].startsWith("Insert Into RCHMA")) {
					var idx = lines[line].indexOf("Values");
					var strOut = lines[line].substr(idx+8);
					strOut = strOut.substr(0, strOut.length-2);
					parseCust(strOut);
				}
			}

			/*
			for(line = 0; line < $scope.custList.length; line++) {
				console.log(JSON.stringify($scope.custList[line]));
			}
			*/
		}, function errorCallback(response) {
			//Second function handles error
		});
	};

	// get "廠商資料"
	$scope.getSupplInfo = function() {
		$http.post("/getRCHME")
		.then(function successCallback(response) {
			//First function handles success
			//console.log("response is : " + response.data);
			var lines = response.data.split('\n');
			for(var line = 0; line < lines.length; line++){
				if(lines[line].startsWith("Insert Into RCHME")) {
					var idx = lines[line].indexOf("Values");
					var strOut = lines[line].substr(idx+8);
					strOut = strOut.substr(0, strOut.length-2);
					//console.log(strOut);
					parseSuppl(strOut);
				}
			}
			/*
			for(line = 0; line < $scope.custList.length; line++) {
				console.log(JSON.stringify($scope.custList[line]));
			}
			*/
		}, function errorCallback(response) {
			//Second function handles error
		});
	};

	// get "訂單單頭"
	$scope.getShprInfo = function() {
		$http.post("/getRCHMB")
		.then(function successCallback(response) {
			//First function handles success
			//console.log("response is : " + response.data);
			var lines = response.data.split('\n');
			for(var line = 0; line < lines.length; line++){
				if(lines[line].startsWith("Insert Into RCHMB")) {
					//console.log(lines[line]);
					var idx = lines[line].indexOf("Values");
					var strOut = lines[line].substr(idx+8);
					strOut = strOut.substr(0, strOut.length-2);
					parseShpr(strOut);
				}
			}
			/*
			for(line = 0; line < $scope.shprList.length; line++) {
				console.log(JSON.stringify($scope.shprList[line]));
			}
			*/
		}, function errorCallback(response) {
			//Second function handles error
		});
	};

	// get "訂單單身"
	$scope.getShprDetail = function() {

		console.log("getShprDetail() is called");
		$http.post("/getRCHMC")
		.then(function successCallback(response) {
			//First function handles success
			//console.log("response is : " + response.data);
			var lines = response.data.split('\n');
			for(var line = 0; line < lines.length; line++){
				if(lines[line].startsWith("Insert Into RCHMC")) {
					var idx = lines[line].indexOf("Values");
					var strOut = lines[line].substr(idx+8);
					strOut = strOut.substr(0, strOut.length-2);
					//console.log(strOut);
					parseShprDetail(strOut);
				}
			}
		}, function errorCallback(response) {
			//Second function handles error
		});
	};

	// get "料件資料"
	$scope.getItmInfo = function() {
		console.log("getItmInfo() is called");
		$http.post("/getRCHMD")
		.then(function successCallback(response) {
			//First function handles success
			//console.log("response is : " + response.data);
			var lines = response.data.split('\n');
			for(var line = 0; line < lines.length; line++){
				if(lines[line].startsWith("Insert Into RCHMD")) {
					var idx = lines[line].indexOf("Values");
					var strOut = lines[line].substr(idx+8);
					strOut = strOut.substr(0, strOut.length-2);
					//console.log(strOut);
					parseItemInfo(strOut);
				}
			}
		}, function errorCallback(response) {
			//Second function handles error
		});
	};

	// 批次載入客戶資料
	$scope.updateCustInfo = function() {
		console.log("updateCustInfo() !!");	
		if($scope.custList && $scope.custList.length !== undefined) { // has some elements
			for(var i = 0; i < $scope.custList.length; i++) {
				console.log("index is : " + i + ", cust info is : " + JSON.stringify($scope.custList[i]));
				// add new cust procedure is called
				$http.post("/addNewCust",angular.toJson($scope.custList[i]))
				.then(function successCallback(response) {
					console.log("add new customer is successed!!");
				}, function errorCallback(response) {
					console.log("failed to add new customer");
				});
			}
		}
	};

	// 批次載入廠商資料
	$scope.updateSupplInfo = function() {
		console.log("updateSupplInfo() !!");	
		if($scope.supplList && $scope.supplList.length !== undefined) { // has some elements
			for(var i = 0; i < $scope.supplList.length; i++) {
				console.log("index is : " + i + ", suppl info is : " + JSON.stringify($scope.supplList[i]));
				// add new supplier procedure is called
				$http.post("/addNewCust",angular.toJson($scope.supplList[i]))
				.then(function successCallback(response) {
					console.log("add new supplier is successed!!");
				}, function errorCallback(response) {
					console.log("failed to add new customer");
				});
			}
		}
	};

	// 批次載入料件資料
	$scope.updateItmInfo = function() {
		console.log("updateItmInfo() !!");	
		if($scope.itmList && $scope.itmList.length !== undefined) { // has some elements
			for(var i = 0; i < $scope.itmList.length; i++) {
				console.log("index is : " + i + ", item info is : " + JSON.stringify($scope.itmList[i]));
				// add new item procedure is called
				$http.post("/addNewItem",angular.toJson($scope.itmList[i]))
				.then(function successCallback(response) {
					console.log("add new supplier is successed!!");
				}, function errorCallback(response) {
					console.log("failed to add new customer");
				});
			}
		}
	};

	// 批次載入訂單單頭
	$scope.updateShprInfo = function() {
		console.log("updateShprInfo() !!");	
		if($scope.shprList && $scope.shprList.length !== undefined) { // has some elements
			for(var i = 0; i < $scope.shprList.length; i++) {
				console.log("index is : " + i + ", shipper info is : " + angular.toJson($scope.shprList[i]));
				// add new shipper procedure is called
				$http.post("/addNewShpr",angular.toJson($scope.shprList[i]))
				.then(function successCallback(response) {
					console.log("add new shipper is successed!!");
				}, function errorCallback(response) {
					console.log("failed to add new customer");
				});
			}
		}
	};

	// 批次載入訂單單身
	$scope.updateShprDetailInfo = function() {
		console.log("updateShprDetailInfo() !!");	
		if($scope.shprDetailList && $scope.shprDetailList.length !== undefined) { // has some elements
			console.log("data length is : " + $scope.shprDetailList.length);
			//$scope.shprDetailList.length
			for(var i = 0; i < $scope.shprDetailList.length; i++) {
				console.log("index is : " + i + ", shipper detail info is : " + angular.toJson($scope.shprDetailList[i]));
				// add new shipper detail procedure is called
				$http.post("/addNewShprItem",angular.toJson($scope.shprDetailList[i]))
				.then(function successCallback(response) {
					console.log("add new shipper is successed!!");
				}, function errorCallback(response) {
					console.log("failed to add new customer");
				});
			}
		}
	};

	// local functions in controller
	var parseCust = function(custStr) {
		var custinfos = custStr.split(',');

		/*
		for(var cIdx = 0; cIdx < custinfos.length; cIdx++) {
			var subCust = custinfos[cIdx].substr(1,custinfos[cIdx].length-2);
			console.log("index is : " + cIdx + ", custinfo is : " + subCust);
		}
		*/
		

		var _custCntctPr = "";
		var _custTel = "";
		var _custMobile = "";
		var _custFax = "";
		var _custSN = "";
		var _custMemo = "";

		if(custinfos[6] && custinfos[6].length !== undefined) { // memo has somethingd
			_custCntctPr = custinfos[6].substr(1,custinfos[6].length-2);
		}

		if(custinfos[7] && custinfos[7].length !== undefined) { // memo has somethingd
			_custTel = custinfos[7].substr(1,custinfos[7].length-2);
		}

		if(custinfos[9] && custinfos[9].length !== undefined) { // memo has somethingd
			_custMobile = custinfos[9].substr(1,custinfos[9].length-2);
		}

		if(custinfos[10] && custinfos[10].length !== undefined) { // memo has somethingd
			_custFax = custinfos[10].substr(1,custinfos[10].length-2);
		}

		if(custinfos[11] && custinfos[11].length !== undefined) { // memo has somethingd
			_custSN = custinfos[11].substr(1,custinfos[11].length-2);
		}

		if(custinfos[13] && custinfos[13].length !== undefined) { // memo has somethingd
			_custMemo = custinfos[13].substr(1,custinfos[13].length-2);
		}

		var _cust = {
			id: custinfos[0].substr(1,custinfos[0].length-2),
			comptype: 0,
			shortName: custinfos[1].substr(1,custinfos[1].length-2),
			name: custinfos[2].substr(1,custinfos[2].length-2),
			regAddr: custinfos[3].substr(1,custinfos[3].length-2),
			shpAddr: custinfos[4].substr(1,custinfos[4].length-2),
			ctPer: _custCntctPr,
			tel: _custTel,
			mobilePh: _custMobile,
			fax: _custFax,
			uniSn: _custSN,
			memo: _custMemo
		};

		//console.log(JSON.stringify(_cust));
		$scope.custList.push(_cust);
	};

	var parseShpr = function(shprStr) {

		var shprInfos = shprStr.split(',');
    
    /*
		for(var cIdx = 0; cIdx < shprInfos.length; cIdx++) {
			var subShpr = shprInfos[cIdx].substr(1,shprInfos[cIdx].length-2);
			console.log("index is : " + cIdx + ", shprInfo is : " + subShpr);
		}
		*/

		var _shprMemo = "";

		if(shprInfos[4] && shprInfos[4].length !== undefined) { // memo has somethingd
			_shprMemo = shprInfos[4].substr(1,shprInfos[4].length-2)
		}

		var shpr = {
			sn: shprInfos[0].substr(1,shprInfos[0].length-2),
			date: shprInfos[1].substr(1,shprInfos[1].length-2),
			custId: shprInfos[2].substr(1,shprInfos[2].length-2),
			addr: shprInfos[3].substr(1,shprInfos[3].length-2),
			pt:"",
			memo: _shprMemo
		};

		$scope.shprList.push(shpr);
	};

	var parseShprDetail = function(shprDetailStr) {
		var shprDetails = shprDetailStr.split(',');
		
		/*
		console.log(shprDetailStr);
		for(var cIdx = 0; cIdx < shprDetails.length; cIdx++) {
			console.log("index is : " + cIdx + ", ShprDetail is : " + shprDetails[cIdx]);
			var subShprDetail = shprDetails[cIdx].substr(1,shprDetails[cIdx].length-2);
			//console.log("index is : " + cIdx + ", ShprDetail is : " + subShprDetail);
		}
		console.log("================");
		*/
		
		var _shpSn = "";

		if(shprDetails[10] && shprDetails[10].length !== undefined) { // memo has somethingd
			_shpSn = shprDetails[10].substr(1,shprDetails[10].length-2)
		}

		var _shprDetail = {
			shprItemSn: _shpSn,
			shprNo: shprDetails[0].substr(1,shprDetails[0].length-2),
			//sn: shprDetails[1],
			itemId: shprDetails[2].substr(1,shprDetails[2].length-2),
			itemNm: getItemName(shprDetails[2].substr(1,shprDetails[2].length-2)),
			sp: shprDetails[4],
			qty: shprDetails[3],
			//shpAmt: shprDetails[5],
			//shpTax: shprDetails[6],
			//shpSubTal: shprDetails[7],
			//shpPartSN: shprDetails[8].substr(1,shprDetails[8].length-2),
			memo: shprDetails[8].substr(1,shprDetails[8].length-2) + "; " + shprDetails[9].substr(1,shprDetails[9].length-2)
		};

		//console.log(JSON.stringify(_shprDetail));

		$scope.shprDetailList.push(_shprDetail);
	};

	var parseItemInfo = function(itmInfoStr) {
		var itmInfos = itmInfoStr.split(',');

		/*
		for(var cIdx = 0; cIdx < itmInfos.length; cIdx++) {
			console.log("index is : " + cIdx + ", itmInfo is : " + itmInfos[cIdx]);
			//var subItmInfo = shprDetails[cIdx].substr(1,shprDetails[cIdx].length-2);
			//console.log("index is : " + cIdx + ", ShprDetail is : " + subShprDetail);
		}
		console.log("================");
		*/

		var _itmMemo = "";

		if(itmInfos[19] && itmInfos[19].length !== undefined) { // memo has somethingd
			_itmMemo = itmInfos[19].substr(1,itmInfos[19].length-2)
		}
		//console.log("Material is : " + itmInfos[6]);

		var _itm = {
			id: itmInfos[0].substr(1,itmInfos[0].length-2),
			name: itmInfos[1].substr(1,itmInfos[1].length-2),
			matl: itmInfos[6].substr(1,itmInfos[6].length-2),
			spec: "",
			pp: itmInfos[7],
			sp: itmInfos[8],
			memo: _itmMemo
		}

		$scope.itmList.push(_itm);
	};

	var parseSuppl = function(supplStr) {
		var supplinfos = supplStr.split(',');

		/*
		for(var cIdx = 0; cIdx < supplinfos.length; cIdx++) {
			var subSuppl = supplinfos[cIdx].substr(1,supplinfos[cIdx].length-2);
			console.log("index is : " + cIdx + ", supplier info is : " + subSuppl);
		}
		console.log("================");
		*/
		
		var _suppl = {
			id: supplinfos[0].substr(1,supplinfos[0].length-2),
			comptype: 1,
			shortName: supplinfos[1].substr(1,supplinfos[1].length-2),
			name: supplinfos[2].substr(1,supplinfos[2].length-2),
			regAddr: supplinfos[3].substr(1,supplinfos[3].length-2),
			shpAddr: supplinfos[4].substr(1,supplinfos[4].length-2),
			ctPer: supplinfos[6].substr(1,supplinfos[5].length-2),
			tel: supplinfos[7].substr(1,supplinfos[7].length-2),
			mobilePh: supplinfos[8].substr(1,supplinfos[8].length-2),
			fax: supplinfos[9].substr(1,supplinfos[9].length-2),
			uniSn: supplinfos[10].substr(1,supplinfos[10].length-2),
			memo: ""
		};

		//console.log(JSON.stringify(_suppl));
		$scope.supplList.push(_suppl);
	};

	var getItemName = function(itemId) {
		if(itemId && itemId.length !== undefined) { // memo has somethingd
			for(var i = 0; i < $scope.itmList.length; i++) {
				if($scope.itmList[i].id == itemId) {
					return $scope.itmList[i].name;
				}
			}
		}
		return "";
	};

});