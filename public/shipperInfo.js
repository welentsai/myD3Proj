
var app = angular.module('shpr_uib_app', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('shprInfoCtrl', function ($scope, $http, $uibModal, $filter) {

	var $ctrl = this;

	$ctrl.animationsEnabled = true;
	$scope.isNavCollapsed = true;
	$scope.isDisabled = true;

	// init for shpping item list
	$scope.shprItemList = [];
	$scope.selectedShprItm = null;

	// init for selecting customer id
	$ctrl.custIdList = [];
	$ctrl.selectedCust = null;



	// date picker result format list
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];  // default date format

	$scope.popupDP = {
    opened: false
  };

  $scope.enableNewShprBtn = function() {
  	console.log("enableNewShprBtn() is called!!");

  	$http.post("/getLatestShprSN")
		.then(function successCallback(response) {
			console.log("getLatestShprSN() is successed!!");
			var maxsn = response.data;
			var lastSn = maxsn[Object.keys(maxsn)[0]];
			var d = new Date();			
			var yr = d.getFullYear() - 1912 + 1;
			var m = d.getMonth() + 1 ;
			var yrm = yr + "" + m ;
			var sn;

			if (lastSn != null) { // record exists
				if(lastSn.length == 8) { 
					console.log("valid serial number");
					var preStr = lastSn.substring(0, 5);
					var sufStr = lastSn.substring(5)
				}
				console.log("latest serial number is " + JSON.stringify(lastSn));
				console.log("preStr is " + preStr);
				console.log("suffix string is " + sufStr);

				if(yrm == preStr) { // the same month, serial number increment by 1
					console.log("the same month, serial number increment by 1");
					sn = Number(sufStr) + 1;
					console.log("sn is : " + sn);
				} else {
					sn = 1;
				}
				//console.log("suffix serial is : " + ("00" + sn).slice(-3));
				$scope.shprID = yrm + "" + ("00" + sn).slice(-3);
			} else {
				$scope.shprID = yrm + "" + ("001").slice(-3);
			}

		}, function errorCallback(response) {
			console.log("failed to getLatestShprSN()");
		});

  	if($scope.isDisabled) {
  		$scope.isDisabled = false;
  	} 
  }

	//shprInfoCtrl.addNewShpItm()
	$scope.addNewShpItm = function(size) {
		console.log("addNewShpItm() is called");

		$scope.selectedShprItm = null; // clean selected shpping item

		var modalInstance = $uibModal.open({
			animation: $ctrl.animationsEnabled,
			templateUrl: 'shprItemModal.html',
			scope: $scope,
			controller: 'shprItemModalCtrl',
			controllerAs: '$ctrl',
			size: size,
      resolve: {
        selectedCust: function () {
          return $ctrl.selectedCust;
        }
      }
		});
		
		modalInstance.result.then(function (shprItem) {
			console.log("ok button is clicked!! Do something before dialog closed!!");
			console.log("new shipping itme is : " + JSON.stringify(shprItem));
			$scope.shprItemList = $scope.shprItemList.concat(shprItem);
		}, function(){
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	$scope.modifyShpItm = function(idx, shprItm) {
		console.log("modifyShpItm() is called");
		console.log("idx is " + idx);
		console.log("shprItem is : " + JSON.stringify(shprItm));

		$scope.selectedShprItm = shprItm;

		var modalInstance = $uibModal.open({
			animation: $ctrl.animationsEnabled,
			templateUrl: 'shprItemModal.html',
			scope: $scope,
			controller: 'shprItemModalCtrl',
			controllerAs: '$ctrl',
			size: null,
      resolve: {
        selectedCust: function () {
          return $ctrl.selectedCust;
        }
      }
		});
		
		modalInstance.result.then(function (shprItem) {
			console.log("ok button is clicked!! Do something before dialog closed!!");
			console.log("modify shipping itme is : " + JSON.stringify(shprItem));
			$scope.shprItemList[idx] = shprItem;
			//$scope.shprItemList = $scope.shprItemList.concat(shprItem);
		}, function(){
			console.log('Modal dismissed at: ' + new Date());
		});
	};

  $scope.addNewShpr = function() {
  	console.log("addNewShpr() is called");
  	console.log("Date is " + $filter('date')($scope.shprDate,'yyyy-MM-dd'));
  	var shpr = {
  		sn: $scope.shprID,
  		date: $filter('date')($scope.shprDate,'yyyy-MM-dd'),
  		custId: $scope.shprCust,
  		addr: $scope.shprAddr,
  		pt: $scope.shprPmtMeth,
  		memo: $scope.shprMemo
  	};

  	console.log("new shipper is " + JSON.stringify(shpr));

		$http.post("/addNewShpr",JSON.stringify(shpr))
		.then(function successCallback(response) {
			console.log("add new shipper is successed!!");
		}, function errorCallback(response) {
			console.log("failed to add new shipper");
		});

		$scope.isDisabled = true;
  };

  $scope.opendp = function() {
  	console.log("popup datepicker is called!!");
  	$scope.popupDP.opened = true;
  }

  // get customer id list from DB
  $scope.getCustIdList = function(size) {
  	console.log("getCustIdList() is called");
		$http.post("/getCustIdList")
		.then(function successCallback(response) {
			console.log("looking up all customers id is successed!!");
			$ctrl.custIdList = response.data;
			var rows = $ctrl.custIdList;
			for(var i in rows) {
				console.log(JSON.stringify(rows[i]));
			}
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				templateUrl: 'custIdListModal.html',
				controller: 'CustIdListModalInstanceCtrl',
				controllerAs: '$ctrl',
				size: size,
	      resolve: {
	        custIdList: function () {
	          return $ctrl.custIdList;
	        }
	      }
			});
			
			modalInstance.result.then(function (selectedCust) {
				console.log("Do something before customer ID/NAME dialog closed!!");
				$ctrl.selectedCust = selectedCust;
				$scope.shprCust = selectedCust.id + " ( " + selectedCust.shortName +" )";
				$scope.shprAddr = selectedCust.shpAddr;

				//console.log("selected cust is : " + JSON.stringify($ctrl.selectedCust));
			}, function(){
				console.log('Modal dismissed at: ' + new Date());
			});

		}, function errorCallback(response) {
			console.log("failed to looking up all customers id");
		});
  };

});

app.controller('shprItemModalCtrl', function ($http, $uibModal, $uibModalInstance, $scope, selectedCust) {

	var $ctrl = this;
	$ctrl.isModifyMode = false;

	//ModalInstanceCtrl.shprCustId
	if($scope.selectedShprItm == null) { // add new item is called
		$ctrl.shprCustId = selectedCust.id;
		$ctrl.shprItmNo = '';
		$ctrl.shprItemName = '';
		$ctrl.shprItmPr = 0;
		$ctrl.shprItmQty = 0;
		$ctrl.shprItmMemo = '';
	} else {
		$ctrl.isModifyMode = true;
		$ctrl.shprCustId = selectedCust.id;
		$ctrl.shprItmNo = $scope.selectedShprItm.itemId;
		$ctrl.shprItemName = $scope.selectedShprItm.itemNm;
		$ctrl.shprItmPr = $scope.selectedShprItm.sp;
		$ctrl.shprItmQty = $scope.selectedShprItm.qty;
		$ctrl.shprItmMemo = $scope.selectedShprItm.memo;
	}

	//console.log("selected cust is : " + JSON.stringify(selectedCust));
	//console.log("shprId passed to shprItemModal is : " + $scope.shprID);

	$ctrl.getItemList = function() {
		var item = {id:"ALL"};
		$http.post("/lookupItemById", JSON.stringify(item))
		.then(function successCallback(response) {
			console.log("looking up all customers id is successed!!");
			$ctrl.itemList = response.data;
			//var rows = $ctrl.itemList;
			//for(var i in rows) {
			//	console.log(JSON.stringify(rows[i]));
			//}
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				templateUrl: 'shprItemListModal.html',
				controller: 'shprItemListModalCtrl',
				controllerAs: '$ctrl',
				size: null,
	      resolve: {
	        itemList: function () {
	          return $ctrl.itemList;
	        }
	      }				
			});

			modalInstance.result.then(function (item) {
				console.log("Do something before customer ID/NAME dialog closed!!");
				console.log("selected item is : " + JSON.stringify(item));
				$ctrl.shprItmNo = item.id;
				$ctrl.shprItemName = item.name;
				$ctrl.shprItmPr = item.sp;
			}, function(){
				console.log('Modal dismissed at: ' + new Date());
			});

		}, function errorCallback(response) {
			console.log("failed to looking up all customers id");
		});		
	}

  $ctrl.ok = function () {
  	var shprItem = {
  		shprNo: $scope.shprID,
  		itemId: $ctrl.shprItmNo,
  		itemNm: $ctrl.shprItemName,
  		sp: $ctrl.shprItmPr,
  		qty: $ctrl.shprItmQty,
  		memo: $ctrl.shprItmMemo
  	};

  	// 這邊還要好好想一下, 看怎麼更新修改的明細
  	if($ctrl.isModifyMode) { //modify mode
  		// update DB 
  	} else { // new shipping item mode
  		// insert DB
	  	console.log("new shpping item is : " + JSON.stringify(shprItem));
			$http.post("/addNewShprItem", JSON.stringify(shprItem))
			.then(function successCallback(response) {
				console.log("addNewShprItem() is successed!!");
			}, function errorCallback(response) {
				console.log("addNewShprItem() failed");
			});  		
  	}

  	$ctrl.isModifyMode = false;
		$scope.selectedShprItm = null;
    $uibModalInstance.close(shprItem);
  };

  $ctrl.cancel = function () {
  	$ctrl.isModifyMode = false;
  	$scope.selectedShprItm = null;
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('shprItemListModalCtrl', function ($uibModalInstance, itemList) {
	var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  var $ctrl = this;
  $ctrl.itemList = itemList;
	$ctrl.selectItem = function(item) {
		//console.log("item is selected: " + JSON.stringify(item));
		$uibModalInstance.close(item);
		//$ctrl.selected.cust = cust;
	};

	//ModalInstanceCtrl.ok()
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('CustIdListModalInstanceCtrl', function ($uibModalInstance, custIdList) {

	var $ctrl = this;

	$ctrl.custList = custIdList;

	$ctrl.selectCust = function(cust) {
		//console.log("cust is selected: " + JSON.stringify(cust));
		$uibModalInstance.close(cust);
		//$ctrl.selected.cust = cust;
	};

	//ModalInstanceCtrl.ok()
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.cust);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

