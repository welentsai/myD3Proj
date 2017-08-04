
var app = angular.module("item_uib_app", ['ui.bootstrap']);

app.controller('itemInfoCtrl', function ($scope, $http) {

	// initialization
	$scope.items = null;

	$scope.isExist = function(item, items) {
		if(items) {
			var i;
			for (i = 0; i < items.length; i++) {
				if (angular.equals(items[i].id, item.id)) {
					return true;
				}
			}
		}
		return false;
	};

	// look up items
	$scope.lookupItemById = function() {
		console.log("lookupItemById() is called!!!");
		var item = {id:"ALL"};
		console.log(JSON.stringify(item));
		$http.post("/lookupItemById",JSON.stringify(item))
		.then(function successCallback(response) {
			console.log("looking up all items is successed!!");
			$scope.items = response.data;
			var rows = response.data;
			/*
			for(var i in rows) {
				console.log(JSON.stringify(rows[i]));
			}
			*/
		}, function errorCallback(response) {
			console.log("failed to looking up all items");
		});
	};

	$scope.selectItem = function(item) {
		console.log("selectItem is called!!");
		$scope.itemId = item.id;
		$scope.itemName = item.name;
		$scope.itemMatl = item.matl;
		$scope.itemSpec = item.spec;
		$scope.itemPP = item.pp;
		$scope.itemSP = item.sp;
		$scope.itemMemo = item.memo;
	};

	$scope.addItem = function() {
		console.log("addItem() is called!!");
		var item = {
			id: $scope.itemId,
			name: $scope.itemName,
			matl: $scope.itemMatl,
			spec: $scope.itemSpec,
			pp: $scope.itemPP,
			sp: $scope.itemSP,
			memo: $scope.itemMemo
		};
		console.log("Item is : " + JSON.stringify(item));
		if(this.isExist(item, $scope.items)) {
			console.log("Item exists!! Update item info!!!");
			$http.post("/updateItem",JSON.stringify(item))
			.then(function successCallback(response) {
				console.log("update item is successed!!");
			}, function errorCallback(response) {
				console.log("failed to update item!!");
			});
		} else {
			console.log("Item does not exist!! Add New Item!!!");
			$http.post("/addNewItem",JSON.stringify(item))
			.then(function successCallback(response) {
				console.log("add new customer is successed!!");
			}, function errorCallback(response) {
				console.log("failed to add new customer");
			});
		}
	};

	$scope.delItem = function() {
		console.log("delItem() is called!!");
		var itemId = {id:$scope.itemId};
		console.log(JSON.stringify(itemId));
		$http.post("/delItemById",JSON.stringify(itemId))
		.then(function successCallback(response) {
			console.log("delete cust is successed!!");
		}, function errorCallback(response) {
			console.log("failed to delete assigned customers id");
		});		
	};

});