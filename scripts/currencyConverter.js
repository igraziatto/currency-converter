/**
 * Plugin that takes an amount and rate given by the user and converts accordingly
 * @author Isis Graziatto <https://github.com/igraziatto>
 * @version 1.0.0
 */
/** 
*
* @constructor 
*
*/
function CurrencyConverter(){
	 "use strict";

	if (!(this instanceof CurrencyConverter)) {
		throw new Error("CurrencyConverter needs to be called with the 'new' keyword");
	}

	this.self = arguments[0];
	var apiURL = "http://api.fixer.io/latest?base=",
		form,
		convertedCurrency,
		convertedAmount,
		btnDisclaimer;
}
/**
*
* Contructor function, gather elements and call addEvents for plugin to work properly.
*
*/
CurrencyConverter.prototype.init = function(){
	//gather properties
	form = this.self.querySelectorAll("[name='currency-form']")[0];
	convertedCurrency = form.querySelectorAll("[name='converted-currency']")[0];
	convertedAmount = form.querySelectorAll("[name='converted-amount']")[0];
	btnDisclaimer = this.self.querySelectorAll(".btn-disclaimer")[0];

	//call function to add events
	this.addEvents();
}
/**
* TODO
*
* @param {string} xxx - xxx
*/
CurrencyConverter.prototype.destroy = function(){
	console.log("destroy method...")
}
/**
*
* Add "change" to convertedCurrency select, "submit" to form and "click" to btnDisclaimer 
*
*/
CurrencyConverter.prototype.addEvents = function(){
	//Get values from form and fire submit event
	convertedCurrency.addEventListener("change", function(){
		//Simulate form submit
		this.self.querySelectorAll("[name='btn-submit']")[0].click();
	}.bind(this), false);

	//Validate form logic before submiting
	form.addEventListener("submit", function(e){
		e.preventDefault();
		var form = this.self.querySelectorAll("[name='currency-form']")[0],
			inputValues = {
				currentAmount: form.querySelectorAll("[name='current-amount']")[0].value,
				currentCurrency: form.querySelectorAll("[name='current-currency']")[0].value,
				convertedCurrency: form.querySelectorAll("[name='converted-currency']")[0].value
			};

		//if amount entered is equal to 0, converted amount should be 0
		if(inputValues.currentAmount === "0"){
			this.setConvertedAmount(0);
			return false;
		}
		//if currencies are the same, there is no need for conversion
		if(inputValues.currentCurrency === inputValues.convertedCurrency){
			this.setConvertedAmount(inputValues.currentAmount);
			return false;
		}
		//submitCurrencyForm.call(this);
		this.submitCurrencyForm(inputValues);
	}.bind(this), false);

	//btnDisclaimer controls disclaimer visibility
	btnDisclaimer.addEventListener("click", function(e){
		var targetSelector = this.getAttribute('data-target'),
			target = this.offsetParent.querySelectorAll(targetSelector)[0];
		
		toggleVisibility(target);
	});
}
/**
* Calculate an given amount against a given rate. Returns the result.
*
* @param {string} amount - The initial amount.
* @param {string} rate - The rate.
*/
CurrencyConverter.prototype.calculateAmount = function(amount, rate){
	return parseFloat(rate) / parseFloat(amount);
}
/**
* Makes an AJAX call to http://api.fixer.io/ sending "base" as a parameter. Call callback sending "data" as parameter.
*
* @param {string} base - the choosen rate name. Ex: "USD", "CAD", "EUR".
* @param {function} callback - a function to be called if the AJAX call is successful.
*/
CurrencyConverter.prototype.getRates = function(base, callback){
	var request = new XMLHttpRequest();
	request.open("GET", "http://api.fixer.io/latest?base="+base, true);

	request.onload = function(){
	  if(this.status >= 200 && this.status < 400){
	    // Success!
	    var data = JSON.parse(this.response);
	    callback(data);
	  }else{
		console.log("Error", "Reached target server, but it returned an error");
		console.log("Error", request.responseText);
	  }
	};

	request.onerror = function(){
		console.log("Error", "An connection error occurred during the transaction");
		console.log("Error", request.responseText);
	};

	request.send();
}
/**
* Set a value to the input[name="converted-amount"].
*
* @param {string} val - the value to be setted.
*/
CurrencyConverter.prototype.setConvertedAmount = function(val){
	this.self.querySelectorAll("[name='converted-amount']")[0].value = val;
}
/**
* Set innerHTML in designated elements inside div.block-disclaimer.
*
* @param {string} rateName - the choosen rate name. Ex: "USD", "CAD", "EUR".
* @param {string} input - the amount to be converted.
* @param {string} rate - the choosen rate value.
* @param {string} output - the converted amount.
*/
CurrencyConverter.prototype.setDisclaimer = function(rateName, input, rate, output){
	var disclaimer = this.self.querySelectorAll(".disclaimer")[0];

	disclaimer.querySelectorAll(".rate-name")[0].innerHTML = rateName;
	disclaimer.querySelectorAll(".input")[0].innerHTML = input;
	disclaimer.querySelectorAll(".output")[0].innerHTML = output;

	disclaimer.querySelectorAll(".rate-value").forEach(function(element){
	  element.innerHTML = rate;
	});
}
/**
* Perform submit in the form, call getRates() with a callback function that call setConvertedAmount() and setDisclaimer()
* @param {object} inputValues - object with values gathered from the form
*/
CurrencyConverter.prototype.submitCurrencyForm = function(inputValues){
	this.getRates(inputValues.currentCurrency, function(data){
		console.log(data);
		var ca = this.calculateAmount(inputValues.currentAmount, data.rates[inputValues.convertedCurrency]);
		this.setConvertedAmount(ca);
		this.setDisclaimer(inputValues.convertedCurrency, inputValues.currentAmount, data.rates[inputValues.convertedCurrency], ca);
	}.bind(this));
};

/**
* ----------------
* Helper Functions (Global)
* -----------------
*/

/**
* Toggles the style visibility and opacity in a given element.
*
* @param {DOM object} element - the designated element.
*/
toggleVisibility = function(element){
	if(element.style.visibility === "hidden"){
		element.style.opacity = 1;
		element.style.visibility = "visible";
	}else{
		element.style.opacity = 0;
		element.style.visibility = "hidden";
	}
}