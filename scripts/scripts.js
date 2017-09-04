(function(window){
"use strict";

window.onload = function(){
	var currencyConverter1 = new currencyConverter(document.getElementById("currencyConverter1"));
	currencyConverter1.init();

	var currencyConverter2 = new currencyConverter(document.getElementById("currencyConverter2"));
	currencyConverter2.init();

	var currencyConverter3 = new currencyConverter(document.getElementById("currencyConverter3"));
	currencyConverter3.init();
}

})(window);