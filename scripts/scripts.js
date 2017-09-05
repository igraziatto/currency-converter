(function(window){
"use strict";

window.onload = function(){
	var currencyConverter1 = new CurrencyConverter(document.getElementById("currencyConverter1"));
	currencyConverter1.init();

	var currencyConverter2 = new CurrencyConverter(document.getElementById("currencyConverter2"));
	currencyConverter2.init();

	var currencyConverter3 = new CurrencyConverter(document.getElementById("currencyConverter3"));
	currencyConverter3.init();
}

})(window);