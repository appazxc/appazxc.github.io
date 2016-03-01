
(function(window){

	"use strict";

	if (!window) return;

	var uchi = uchi || {};

	var params = {
		additionArr: [[6, 9]],
		answerArr: [11,14],
		sumTask: "#sum-task",
		tasksPadding: [33, 58]
	}


	uchi.TaskSum = function(params) {

		var numbers = [],
			instances = [],
			result,
			createChallenge,
			challengeNum,
			defaultParams = {
				additionArr: [[5, 10]],
				operandNumber: 2,
				randomNums: 1,
				answerArr: [10,15],
				taskImageUrl: "img/sprite.png",
				challengeImage: "../img/arrow.svg",
				baseStep: 39, // px
				tasksPadding: [10, 10],
				sumTask: ".task-wrapper"
			};

		var params = params || {};

		for (var key in defaultParams) {
			if (params[key] === undefined) {
				params[key] = defaultParams[key];
			}
		};

		


		this.init = function(params) {
			numbers = []
			instances = []
			makeNumbers();
			initExercise();
			createChallenge = createChallenges();
		}

		function sum(arr) {
			var arrSum = 0;

			for (var i = 0; i < arr.length; i++) {
				arrSum += arr[i];
			}

			return arrSum;
		}

		function makeNumbers() {
			for ( var i = 0; i < params.operandNumber - params.randomNums; i++) {
				numbers.push(randomInteger.apply(null, params.additionArr[i]));
			};

			result = randomInteger.apply(null, params.answerArr);
			numbers.push(result - sum(numbers));
		}

		function initExercise() {
			var exercise = document.querySelector(params.sumTask).querySelector(".exercise");
			exercise.innerHTML = "";

			var length = numbers.length;
			for (var i = 0; i < length; i++) {

				var el = elementCreate("span", numbers[i])

				exercise.appendChild(el)
				instances.push({"answer": el});

				if (i < length - 1) {
					exercise.appendChild(elementCreate("span", "+"));
				} else {
					exercise.appendChild(elementCreate("span", "="));
					exercise.appendChild(elementCreate("span", "?"));
				}
			}

			setTimeout(initChallenge, 1000);
		}

		function initChallenge() {
			var challengeRow = document.querySelector(params.sumTask).querySelector(".challenge-row");
			var challengeTasks = challengeRow.querySelector(".challenge-tasks");
			var mainImage = challengeRow.querySelector(".challenge-image > img");
			challengeTasks.innerHTML = "";

			challengeTasks.style.paddingLeft = params.tasksPadding[0] + "px";
			challengeTasks.style.paddingRight = params.tasksPadding[1] + "px";
			mainImage.src = params.taskImageUrl;

			createChallenge();
		}

		function createChallenges() {

			var challengeNum = 0;

			return function() {
				if (challengeNum >= instances.length) {
					var exercise = document.querySelector(params.sumTask).querySelector(".exercise");
					exercise.lastElementChild.remove();
					exercise.appendChild(createAnswerCont());
					return;
				}
				var challengeWrap = document.querySelector(params.sumTask).querySelector(".challenge-tasks");
				var taskImage = elementCreate("div")
				var challengeTask = elementCreate("div");

				challengeTask.classList.add("challenge-task");
				taskImage.classList.add("challenge-task__image");
				taskImage.style.width = instances[challengeNum].answer.innerHTML * params.baseStep + "px"; 
				challengeTask.appendChild(createAnswerCont(challengeNum));
				challengeTask.appendChild(taskImage);
				instances[challengeNum].question = challengeTask;
				challengeWrap.appendChild(challengeTask);
				challengeNum++;
			}
		}

		function createAnswerCont(challengeNum) {
			var el = elementCreate("div");
			var input = elementCreate("input");

			input.addEventListener("keypress", checkInput);

			if (challengeNum === undefined) {
				input.setAttribute("data-answer", result)
			} else {
				input.setAttribute("data-answer", instances[challengeNum].answer.innerHTML)
			}
			el.classList.add("answer-container");
			el.appendChild(input);
			el.appendChild(elementCreate("button", "Проверить"));
			return el;
		};

		function checkInput() {

			var e = e || event;
			var target = e.target;
			var self = this;

			if (e.ctrlKey || e.altKey || e.metaKey) return;

			function getChar(event) {
				return String.fromCharCode(event.keyCode || event.charCode);
			}

			var chr = getChar(e);

			if (chr == null) return;

			if (chr < '0' || chr > '9') {
				e.preventDefault()
			}

			this.onkeyup = function(e) {
				var keyupEvent = this;
				if (!(e.target.value > 0)) return;
				var button = this.nextElementSibling;
				button.style.visibility = "visible";

				button.onclick = function() {

					var answerDiv = self.parentNode;
					var taskDiv = answerDiv.parentNode;

					if (+self.value === result && self.value === self.dataset.answer) {
						self.style.color = "green";

						answerDiv.appendChild(elementCreate("span", self.dataset.answer))

						clearEvents();
						congrat("Поздравляем!");
						moreBtn.style.display = "block";

					} else if (self.value === self.dataset.answer) {
						self.style.color = "green";

						answerDiv.appendChild(elementCreate("span", self.dataset.answer))

						clearEvents();
						reColor("");
						congrat("Правильно!");
						createChallenge();

					} else {
						self.style.color = "red";
						reColor("orange");
					}

					function reColor(color) {
						for (var i = 0; i < instances.length; i++) {
							
							if (instances[i].question === taskDiv) {
								instances[i].answer.style.background = color;
								break;
							}
						}
					}

					function clearEvents() {
						self.remove()
						button.remove();
					}
				}
			}
		}

		function elementCreate(el, inside) {
			var element = document.createElement(el);

			if (inside) {
				element.appendChild(document.createTextNode(inside));
			}

			return element;
		};

		function randomInteger(min, max) {
			var rand = min + Math.random() * (max + 1 - min);
			rand = Math.floor(rand);
			return rand;
		};

		function congrat(message) {
			var congratulation = document.querySelector(".congrat");
			congratulation.innerHTML = message;
			congratulation.style.display = "block";

			setTimeout(function(){
				congratulation.style.display = "none";
			}, 2000)
		};
		
	};

	var sumExercise = new uchi.TaskSum(params);
	sumExercise.init();

	moreBtn.onclick = sumExercise.init;

})(window);
