"use strict"

var ul = document.getElementById("todo-list-ul")
var input = document.querySelector("input")

ul.onclick = function(e) {
	var target = e.target;

	if (target.classList.contains("maked")) {
		var list = target.parentNode.nextElementSibling;
		if (target.classList.contains("maked-yes")) {
			list.style.textDecoration = "none";
			list.style.color = "inherit";
		} else {
			list.style.textDecoration = "line-through"
			list.style.color = "rgb(127, 140, 141)";
		}
		target.classList.toggle("maked-yes")
	}

	if (target.classList.contains("destroy")) {
		var list = target.parentNode
		list.parentNode.removeChild(list)
	}
	
}


input.onkeydown = function(e) {
	if (e.keyCode !== 13) return;
	if (input.value == "") return;

	var newLi = document.createElement("li");
	newLi.classList.add('new-task-wrapper');
	newLi.innerHTML = "<div class='maked-wrap'><div class='maked'> \
	</div></div> <div class='list'>" + input.value + "</div><button class='destroy'></button>";
	ul.insertBefore(newLi, ul.firstElementChild)
}