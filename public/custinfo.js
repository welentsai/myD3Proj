
// get
var app = angular.module("cust_uib_app", ['ui.bootstrap']);

app.controller('custInfoCtrl', function ($scope, $http) {

	$scope.custs = null;

	$scope.isExist = function(cust, custs) {
		if(custs) {
			var i;
			for (i = 0; i < custs.length; i++) {
				if (angular.equals(custs[i].id, cust.id)) {
					return true;
				}
			}
		}
		return false;
	};

	$scope.sameToRegaddr = function() {
		$scope.custShpAddr = $scope.custRegAddr;
		console.log("sameToRegaddr() is called !!!");
	};

	$scope.selectCust = function(cust) {
		console.log("selectCust is called!!");
		$scope.custID = cust.id;
		$scope.custSN = cust.shortName;
		$scope.custN = cust.name;
		$scope.custRegAddr = cust.regAddr;
		$scope.custShpAddr = cust.shpAddr;
		$scope.custCtPer = cust.ctPer;
		$scope.custTel = cust.tel;
		$scope.custFax = cust.fax;
		$scope.custMbPh = cust.mobilePh;
		$scope.custUniSN = cust.uniSn;
		$scope.custMemo = cust.memo;
		//console.log(JSON.stringify(cust));
	};

	// look up the used cust id
	$scope.lookupCustID = function() {
		console.log("lookupCustID() is called!!!");
		var param = {custid:"ALL"};
		console.log(JSON.stringify(param));
		$http.post("/lookupcustid",JSON.stringify(param))
		.then(function successCallback(response) {
			console.log("looking up all customers id is successed!!");
			$scope.custs = response.data;
			var rows = response.data;
			for(var i in rows) {
				console.log(JSON.stringify(rows[i]));
			}
		}, function errorCallback(response) {
			console.log("failed to looking up all customers id");
		});
	};

	$scope.delCust = function() {
		console.log("delCust() is called !!!");
		var custId = {custid:$scope.custID};
		console.log(JSON.stringify(custId));
		$http.post("/delCustById",JSON.stringify(custId))
		.then(function successCallback(response) {
			console.log("delete cust is successed!!");
		}, function errorCallback(response) {
			console.log("failed to delete assigned customers id");
		});		
	};

	$scope.addCust = function() {
		console.log("addCust() is called !!!");
		var cust = {
			id: $scope.custID,
			comptype: 0,
			shortName: $scope.custSN,
			name: $scope.custN,
			regAddr: $scope.custRegAddr,
			shpAddr: $scope.custShpAddr,
			ctPer: $scope.custCtPer,
			tel: $scope.custTel,
			fax: $scope.custFax,
			mobilePh: $scope.custMbPh,
			uniSn: $scope.custUniSN,
			memo: $scope.custMemo
		};
		console.log("Customer is : " + JSON.stringify(cust));
		if(this.isExist(cust, $scope.custs)) {
			console.log("cust already exists!!!");
			console.log("updating cust data");
			// update procedure is called
			$http.post("/updateCust",JSON.stringify(cust))
			.then(function successCallback(response) {
				console.log("update customer is successed!!");
			}, function errorCallback(response) {
				console.log("failed to update customer!!");
			});
		} else {
			console.log("cust not exist !!!");
			// add new cust procedure is called
			$http.post("/addNewCust",JSON.stringify(cust))
			.then(function successCallback(response) {
				console.log("add new customer is successed!!");
			}, function errorCallback(response) {
				console.log("failed to add new customer");
			});
		}
	};


});

