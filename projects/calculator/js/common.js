"use strict"

var calculator = {
	"+": function(a, b) {
		return +a + +b;
	},

	"-": function(a, b) {
		return a - b;
	},

	"/": function(a, b) {
		return a / b;
	},

	"*": function(a, b) {
		return a * b;
	}
};

var stack = "";
var resultArr = [];
var newCalculating = true;
var allNumbers = document.getElementsByTagName('th');
var disp = document.getElementById("display")


	for (var i = 0; i < allNumbers.length; i++) {
		allNumbers[i].addEventListener("click", calc);
	};


function calc () {
	if (!this.innerHTML.search(/\d/g)) {
		if (newCalculating) {
			stack = "";
			resultArr = [];
		};
		stack += this.innerHTML;
		disp.innerHTML = stack;
		resultArr[2] = stack;
		newCalculating = false;
	} else if (!this.innerHTML.search(/[\/\*\-\+]/g)) {
		newCalculating = false;
		resultArr[1] = this.innerHTML;
		if (resultArr[0] == undefined) {
			resultArr[0] = stack;
			stack = "";
		} else if (stack !== "") {
			stack = calculator[resultArr[1]](resultArr[0], resultArr[2]);
			disp.innerHTML = stack;
			resultArr[0] = stack;
			stack = "";
		};
	} else {
		switch(this.innerHTML) {
			case ".": 
				if (newCalculating) {
					stack = "";
					resultArr = [];
				};
				newCalculating = false;
				if (!~stack.indexOf(".") && stack === "") {
					stack = "0."
					disp.innerHTML = stack;
				}
				else if (!~stack.indexOf(".")) {
				stack += ".";
				disp.innerHTML = stack;
				}
				break;
			case "AC": 
				stack = "";
				resultArr = [];
				disp.innerHTML = stack;
				break;
			case "CE": 
				stack = "";
				resultArr[2] = stack;
				disp.innerHTML = stack;
				break;
			case "%": 
				stack = +resultArr[0] * +resultArr[2] / 100  ;
				resultArr[2] = stack;
				disp.innerHTML = stack;
				break;
			case "=": 
				if (resultArr[1] !== undefined) {
					stack = calculator[resultArr[1]](resultArr[0], resultArr[2]);
				if (stack % 1 != 0) {
					stack = +stack.toFixed(5)
					};
				if (stack > 99999999999999999) {
					disp.style.fontSize = "20px"
				} else {
					disp.style.fontSize = "30px"
				}
				disp.innerHTML = stack;
				resultArr[0] = stack;
				stack = "";
				newCalculating = true;
				};
				break;
		};
	};
};
