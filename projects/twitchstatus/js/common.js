"use strict"

var all = document.getElementById("all");
var input = document.querySelector("input");
var channels = document.getElementById("channels");
var scroll = document.querySelector(".scroll")
var scrolled  =  (100 - ( 100 * (channels.scrollHeight - channels.clientHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
var cont = document.querySelector(".container-channels")

scroll.onmousedown = function (e) {

	scroll.style.cursor = "pointer";
	// scroll.style.top = e.clientY -cont.getBoundingClientRect().top - (e.clientY - scroll.getBoundingClientRect().top) + "px";
	// console.log(e.clientY -cont.getBoundingClientRect().top - (e.clientY - scroll.getBoundingClientRect().top))
	document.onmousemove = function (e) {
		

		var r = e.clientY - scroll.getBoundingClientRect().top
		scroll.style.top = (e.clientY - scroll.getBoundingClientRect().top) + "px";
		console.log(r)
		// if (e.clientY > cont.getBoundingClientRect().bottom  - scroll.offsetHeight) {
		// 	scroll.style.top = cont.getBoundingClientRect().bottom -cont.getBoundingClientRect().top - scroll.offsetHeight + "px";
		// } else if (e.clientY < cont.getBoundingClientRect().top)  scroll.style.top = "0px";
		e.stopPropagation();
		return false;
		}

		document.onmouseup = function (e) {
			document.onmousemove = null;
			scroll.style.cursor = "";
			
		}

		e.stopPropagation();
	}

// channels.onmousedown = function (e) {

// 	var pageY = e.clientY;
	
// 	document.onmousemove = function (e) {
// 		channels.style.cursor = "pointer";

// 		var pageNowY = e.clientY;

// 		if (pageNowY < pageY) {
// 			channels.scrollTop += 8;
// 			scrolled =  (100 - ( 100 * (channels.scrollHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
// 			scroll.style.top = scrolled + "px";

// 		} else if (pageNowY > pageY) {
// 			channels.scrollTop -= 8;
// 			scrolled =  (100 - ( 100 * (channels.scrollHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
// 			scroll.style.top = scrolled + "px";
// 		}

// 		pageY = pageNowY;

// 		return false;
// 	}

// 	document.onmouseup = function () {
// 		document.onmousemove = null;
// 		channels.style.cursor = "";
// 	}
// }

// input.onkeyup = function() {
// 	var channels = document.getElementsByClassName("channel-wrapper");
// 	for (var i = 0; i < channels.length; i++) {
// 		channels[i].hidden = true;

// 		if (channels[i].querySelector("a").innerHTML.toLowerCase().search(input.value.toLowerCase()) >=0) {
// 			channels[i].hidden = false;
// 		}
// 	}


// }

all.onclick = function(e) {
	$.getJSON('https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit=25&offset=0', function(data) {
		getStream(data)
	});
}

	$.getJSON('https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit=25&offset=0', function(data) {
		getStream(data)
	});

function getStream(data) {

	if (data["streams"]) {
		var ul = document.getElementById("ul");
		ul.innerHTML = "";

		var twitch = document.getElementById("twitch")
		for (var i = 0; i < data["streams"].length; i++) {

			var li = document.createElement("li");
			li.classList.add("channel-wrapper")


			var divI = document.createElement("img");
			divI.classList.add("channel", "icon")
			if (data["streams"][i]["channel"]["profile_banner"] ) {
				try {
					divI.src = data["streams"][i]["channel"]["profile_banner"];
				} catch (e) {
					divI.src = "./img/emotions.png";
				}
			} else {
				divI.src = "./img/emotions.png";
			}
			li.appendChild(divI)

			var divN = document.createElement("div");
			var a = document.createElement("a");
			divN.classList.add("channel", "channel-name")
			a.href = data["streams"][i]["channel"]["url"]
			a.innerHTML = data["streams"][i]["channel"]["display_name"]
			divN.appendChild(a)
			li.appendChild(divN)
			
			

			var divD = document.createElement("div");
			divD.classList.add("channel", "channel-descr")
			divD.innerHTML = data["streams"][i]["channel"]["game"]
			li.appendChild(divD)

			var divS = document.createElement("div");
			divS.classList.add("channel", "status")
			li.appendChild(divS)

			ul.appendChild(li);

		}
		
		channels.appendChild(ul);

		scroll.style.height =  Math.floor(channels.clientHeight * (channels.clientHeight * 100 / channels.scrollHeight) / 100) + "px";

	}
}