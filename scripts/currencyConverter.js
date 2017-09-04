/**
 * Plugin that takes an amount and rate given by the user and converts accordingly
 * @author Isis Graziatto <https://github.com/igraziatto>
 * @version 1.0.0
 */
function currencyConverter(){
	var self = arguments[0],
		form,
		currentAmount,
		currentCurrency,
		convertedAmount,
		convertedCurrency,
		disclaimer,
		btnDisclaimer;
	/**
	 * Set a value to the input[name="converted-amount"].
	 *
	 * @param {string} val - the value to be setted.
	 */
	function setConvertedAmount(val){
		convertedAmount.value = val;
	}
	/**
	 * Set innerHTML in designated elements inside div.block-disclaimer.
	 *
	 * @param {string} rateName - the choosen rate name. Ex: "USD", "CAD", "EUR".
	 * @param {string} input - the amount to be converted.
	 * @param {string} rate - the choosen rate value.
	 * @param {string} output - the converted amount.
	 */
	function setDisclaimer(rateName, input, rate, output){
		disclaimer.querySelectorAll(".rate-name")[0].innerHTML = rateName;
		disclaimer.querySelectorAll(".input")[0].innerHTML = input;
		disclaimer.querySelectorAll(".output")[0].innerHTML = output;

		disclaimer.querySelectorAll(".rate-value").forEach(function(element){
		  element.innerHTML = rate;
		});
	}
	/**
	 * Makes an AJAX call to http://api.fixer.io/ sending base as an parameter. Returns the data.
	 *
	 * @param {string} base - the choosen rate name. Ex: "USD", "CAD", "EUR".
	 * @param {function} callback - a function to be called if the AJAX call is successful.
	 */
	function getRates(base, callback){
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
	 * Calculate an given amount against a given rate. Returns the result.
	 *
	 * @param {string} amount - The initial amount.
	 * @param {string} rate - The rate.
	 */
	function calculateAmount(amount, rate){
		return parseFloat(rate) / parseFloat(amount);
	}
	/**
	 * Represents a book.
	 *
	 * @param {string} title - The title of the book.
	 */
	function submitCurrencyForm(){
		getRates(form.values.currentCurrency, function(data){
			console.log(data);
			var ca = calculateAmount(form.values.currentAmount, data.rates[form.values.convertedCurrency]);
			setConvertedAmount(ca);
			setDisclaimer(form.values.convertedCurrency, form.values.currentAmount, data.rates[form.values.convertedCurrency], ca);
		});
	}
	/**
	 * Toggle the style visibility and opacity in a given element.
	 *
	 * @param {DOM object} element - the designated element.
	 */
	function toggleVisibility(element){
		if(element.style.visibility === "hidden"){
			element.style.opacity = 1;
			element.style.visibility = "visible";
		}else{
			element.style.opacity = 0;
			element.style.visibility = "hidden";
		}
	}
	function addEvents(){
		// Validate form logic before submiting
		form.addEventListener("submit", function(e){
			e.preventDefault();

			//if amount entered is equal to 0, converted amount should be 0
			if(form.values.currentAmount === "0"){
				setConvertedAmount(0);
				return false;
			}
			//if currencies are the same, there is no need for conversion
			if(form.values.currentCurrency === form.values.convertedCurrency){
				setConvertedAmount(form.values.currentAmount);
				return false;
			}
			submitCurrencyForm();
		});

		//btnDisclaimer controls disclaimer visibility
		btnDisclaimer.addEventListener("click", function(e){
			toggleVisibility(disclaimer);
		});

		//get values from form and fire form submit event
		convertedCurrency.addEventListener("change", function(){
			form.values = {
				currentAmount: currentAmount.value,
				currentCurrency: currentCurrency.value,
				convertedCurrency: convertedCurrency.value
			};
			btnSubmit.click();
		});
	}
	/** 
	*
	* @constructor 
	*
	*/
	function init(){
		//gather properties
		form = self.querySelectorAll("[name='currency-form']")[0];
		currentAmount = form.querySelectorAll("[name='current-amount']")[0];
		currentCurrency = form.querySelectorAll("[name='current-currency']")[0];
		convertedAmount = form.querySelectorAll("[name='converted-amount']")[0];
		convertedCurrency = form.querySelectorAll("[name='converted-currency']")[0];
		btnSubmit = form.querySelectorAll("[name='btn-submit']")[0];
		disclaimer = form.querySelectorAll(".disclaimer")[0];
		btnDisclaimer = form.querySelectorAll(".btn-disclaimer")[0];

		//call function to add events
		addEvents();
	}

	return {
		self : self,
		init : init,
		calculateAmount: calculateAmount
	};
}
