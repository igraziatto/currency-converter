# currency-conveter #

General currency converter developed in javascript without the use of any libraries or frameworks for "certain company" test for a Front-End Developer position.

## Getting Started ##

If you wish to use this in you project, simply add:

`<script type="text/javascript" src="yourpath/currencyConverter.min.js"></script>`

on the <head> of you .html file.
Then, after the window has loaded, instanciate with the command:

`var yourVarNameHere = new currencyConverter(document.getElementById("your-wrapper-element"));
yourVarNameHere.init();`

## Prerequisites ##

* currencyConverter.min.js

Other than that, no prerequisites, currency-converter was written in plain Javascript :)

## Instalation ##

1. Add <script type="text/javascript" src="yourpath/currencyConverter.min.js"></script> to the <head> of the page.
2. Copy the html inside the <section class="currency-converter" id="currencyConverter1"> found in index.html for everything to work properly.
3. Add the following command on your window.load:
  
  `var currencyConverter1 = new currencyConverter(document.getElementById("currencyConverter1"));
  currencyConverter1.init();`
  
  et voilá!
  
## Usage ##

currencyConverter has the following public properties and methods:

 * self: Element - The same element you passed to instantiate.
 * init: Function - Initiates the instance, gathering properties and adding events.
 * calculateAmount: Function - takes 2 parameters (amount, rate) as strings, returns the converted amount.
 * destroy: Function - Erase instance, remove events.

## Built With ##

* HTML5
* Javascript
* SCSS

## Authors ##

Isis Graziatto - @igraziatto

## License ##

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments ##

Hat tip to anyone who's code was used