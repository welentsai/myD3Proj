// the entry function after page loaded
$(document).ready(function() {

	$(window).on("focus", function () { 
		console.log("window focus!!!");
	});

	$("#addShprItemBtn").on("click", function (){
    console.log("add new shipping item button is triggered!!");
    autoCal();
		upLoadShperDetail();
  });

  $("#addNewShpr").on("click", function (){
  	console.log("add new shipper button is triggered!!");
  	traverseLocalStorage();
  });


});

function autoCal(){
	var price = $("#inputShprItmPr").val();
	var qty = $("#inputShprItmQty").val();
	var noTaxAmt = price*qty;
	var tax = noTaxAmt * 0.05
	var taxAmt = noTaxAmt *1.05
	$("#inputShprItmNoTaxAmt").val(Math.round(noTaxAmt));
	$("#inputShprItmTax").val(Math.round(tax));
	$("#inputShprItmTaxAmt").val(Math.round(taxAmt));
}

function upLoadShperDetail() {
	if(validShprData()) { //valid data
		console.log("valid shpping data!! upload to html5 local storage");
		if(typeof(Storage) != "undefined") {
			console.log("Staring logging Shipper Detail ...");
			saveItem("newShippingItem", "true");
			saveItem("inputShprItmQty", $("#inputShprItmQty").val());
			saveItem("inputShprItmPr", $("#inputShprItmPr").val());
		}
	} else { // show up wrong message
		console.log("Shipping Deatil Data is not valided");
	}
}

function validShprData() {
	console.log("validShprData() is triggered");	
	return true;
}

function saveItem(itmName, itmValue) {
	localStorage.setItem(itmName,itmValue);
	console.log("logging Item Pair [" + itmName + " : " + localStorage.getItem(itmName) + "]");
}

function traverseLocalStorage() {
	console.log("Retrive data via HTML5 Local Storage... ");
	for( var i=0; i<localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		console.log("Data Pair is [" + key + " : " + value +"]");
	}
}

