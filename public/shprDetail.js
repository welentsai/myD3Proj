
// the entry function after page loaded
$(document).ready(function() {
	
	//default fake value for testing
	$("#inputShprItmPr").val(100);

	//assign handler for submit button
	$("form").on("submit", function(e) {
		e.preventDefault();
		console.log("submit button is triggered");
		autoCal();
		upLoadShperDetail();
		window.close();
	});

	//assign handler for cancel button
	$("#cancel").click(function(){
		console.log("cancel button is triggered");
	});

	//assign handler for user input Shipping Quantity
	$("#inputShprItmQty").keypress(function(e){
		console.log("handler for inputShprItmQty keypress() called");
		var key = e.keycode || e.which;
		itmQtyPrChanged(key);
	});

	$("#inputShprItmPr").keypress(function(e){
		console.log("handler for inputShprItmQty keypress() called");
		var key = e.keycode || e.which;
		itmQtyPrChanged(key);
	});


});

function itmQtyPrChanged(key) {
	if(key=="13") {
		autoCal();
		console.log("You pressed a \"enter\" key for Quantity or Price changed");
	}
}

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

