

"use strict"

function Calculator(sessionClockId, breakId) {
	var sessionClock = document.getElementById(sessionClockId);
	var breakClock = document.getElementById(breakId);
	var sessionTimeMinutes = 25;
	var sessionTimeSeconds = 0;
	var startedSTM = sessionTimeMinutes;
	var startedSTS =sessionTimeSeconds;
	var breakTimeMinutes = 5;
	var breakTimeSeconds = 0;
	var startedBTM = breakTimeMinutes;
	var startedBTS = breakTimeSeconds;

	var timerId;
	var timerId2;
	var stopedTimer = true;
	var stopedTimer2 = true;
	var thisthis = this;

	var makeTwoSeconds = function(seconds) {
		if (seconds < 10) {
			return "0" + seconds;
		};
		return seconds;
	};

	this.plus = function() {
		if (stopedTimer&& stopedTimer2) {
			sessionTimeMinutes += 1;
			sessionTimeSeconds = 0;
			startedSTM = sessionTimeMinutes;
			startedSTS = sessionTimeSeconds;
			sessionClock.innerHTML = sessionTimeMinutes + " : " + makeTwoSeconds(sessionTimeSeconds);
		};
	};

	this.minus = function() {
		if (stopedTimer && stopedTimer2 && sessionTimeMinutes > 1) {
			sessionTimeMinutes -= 1;
			sessionTimeSeconds = 0;
			startedSTM = sessionTimeMinutes;
			startedSTS = sessionTimeSeconds;
			sessionClock.innerHTML = sessionTimeMinutes + " : " + makeTwoSeconds(sessionTimeSeconds);
		};
	};

	sessionClock.innerHTML = sessionTimeMinutes + " : " + makeTwoSeconds(sessionTimeSeconds);
	breakClock.innerHTML = breakTimeMinutes + " : " + makeTwoSeconds(breakTimeSeconds);

	var startTiktak = function() {

		if (sessionTimeMinutes == 0 && sessionTimeSeconds == 1) {
			clearInterval(timerId);
			stopedTimer = true;
			setTimeout(thisthis.activeTimer2, 1000);
		};

		if ( !sessionTimeSeconds ) {
			sessionTimeSeconds = 59
			sessionTimeMinutes -= 1
		} else {
			sessionTimeSeconds -= 1
		};
		sessionClock.innerHTML = sessionTimeMinutes + " : " + makeTwoSeconds(sessionTimeSeconds);
	};

		var startTiktak2 = function() {
			if (breakTimeMinutes == 0 && breakTimeSeconds == 1) {
				sessionTimeMinutes = startedSTM;
				sessionTimeSeconds = startedSTS;
				breakTimeMinutes = startedBTM;
				breakTimeSeconds = startedBTS+1;
				sessionClock.innerHTML = sessionTimeMinutes + " : " + makeTwoSeconds(sessionTimeSeconds);
				clearInterval(timerId2);
				stopedTimer2 = true;
				setTimeout(thisthis.activeTimer, 1000);
				
			};
			if ( !breakTimeSeconds ) {
				breakTimeSeconds = 59
				breakTimeMinutes -= 1
				} else {
				breakTimeSeconds -= 1
			}
		breakClock.innerHTML = breakTimeMinutes + " : " + makeTwoSeconds(breakTimeSeconds);
		};


	this.activeTimer = function() {
		(stopedTimer && stopedTimer2) ? startSession() : pauseSession();
	};

	this.activeTimer2 = function() {
		if (stopedTimer2 && stopedTimer) {
			startBreak()
		} else {
			pauseBreak();
		};
	};

	var startSession = function() {
		startTiktak()
		timerId = setInterval(startTiktak, 1000);
		stopedTimer = false;
	};

	var pauseSession = function() {
		clearInterval(timerId);
		stopedTimer = true;
	};

	var startBreak = function() {
		startTiktak2()
		timerId2 = setInterval(startTiktak2, 1000);
		stopedTimer2 = false;
	};

	var pauseBreak = function() {
		clearInterval(timerId2);
		stopedTimer2 = true;
	};


	this.plusBreak = function() {
		if (stopedTimer2) {
			breakTimeMinutes += 1;
			breakTimeSeconds = 0;
			startedBTM = breakTimeMinutes;
			startedBTS = breakTimeSeconds;
			breakClock.innerHTML = breakTimeMinutes + " : " + makeTwoSeconds(breakTimeSeconds);
		};
	}

	this.minusBreak = function() {
		if (stopedTimer2 && breakTimeMinutes > 1) {
			breakTimeMinutes -= 1;
			breakTimeSeconds = 0;
			startedBTM = breakTimeMinutes;
			startedBTS = breakTimeSeconds;
			breakClock.innerHTML = breakTimeMinutes + " : " + makeTwoSeconds(breakTimeSeconds);
		};
	};

	this.reset = function() {
		clearInterval(timerId);
		clearInterval(timerId2);
		stopedTimer = true;
		stopedTimer2 = true;
		sessionTimeMinutes = startedSTM;
		sessionTimeSeconds = startedSTS;
		breakTimeMinutes = startedBTM;
		breakTimeSeconds = startedBTS;
		sessionClock.innerHTML = sessionTimeMinutes + " : " + makeTwoSeconds(sessionTimeSeconds);
		breakClock.innerHTML = breakTimeMinutes + " : " + makeTwoSeconds(breakTimeSeconds);

	}


};

var calc = new Calculator("session-clock", "break-clock");


var sessionClock = document.getElementById("timer-s");
var minusSession = document.getElementById("minus-session");
var plusSession = document.getElementById("plus-session");

var breakClock = document.getElementById("timer-b");
var minusBreak = document.getElementById("minus-break");
var plusBreak = document.getElementById("plus-break");

var reset = document.getElementById("reset");

sessionClock.onclick = calc.activeTimer;
minusSession.onclick = calc.minus;
plusSession.onclick = calc.plus;


breakClock.onclick = calc.activeTimer2;
minusBreak.onclick = calc.minusBreak;
plusBreak.onclick = calc.plusBreak;
reset.onclick = calc.reset;