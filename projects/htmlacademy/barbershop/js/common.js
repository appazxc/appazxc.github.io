"use strict"

var login = document.getElementById("login");

login.onclick = function(e) {
	var loginWindow = document.getElementById("login-window");
	e.preventDefault();

	var visible = false;
	if (!visible) {

		var div = document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.zIndex = 25;
		div.style.position = "absolute";
		div.style.top = 0;
		loginWindow.style.display = "block";

		setTimeout(function() {

				loginWindow.style.opacity = 1;

		}, 100)

		document.body.appendChild(div);

		visible = true;

		div.onclick = function(e) {


			div.onclick = null;
			div.remove();
			loginWindow.style.opacity = 0;

			setTimeout(function() {
				
				loginWindow.style.display = "none";
			}, 500)
			
			visible = false;
		}
	}

}