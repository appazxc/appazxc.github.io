"use strict"

var allStreams = document.getElementById("all");
var input = document.querySelector("input");
var channels = document.getElementById("channels");
var scroll = document.querySelector(".scroll")
var scrolled  =  (100 - ( 100 * (channels.scrollHeight - channels.clientHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
var cont = document.querySelector(".container-channels")
var ul = document.getElementById("ul");

var streamChannels = [];

function getCoords(elem) { // кроме IE8-
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}


scroll.onmousedown = function (e) {

	var onScrollClickedCoord = pageYOffset + e.clientY - getCoords(scroll).top;
	var scrollHeight = scroll.offsetHeight;
	var contHeight = cont.offsetHeight;
	var canScrolled = contHeight - scrollHeight;
	var channelsHeight = ul.offsetHeight;
	var scrollY = parseInt(scroll.style.top);

	document.body.style.cursor = "pointer";

	document.onmousemove = function (e) {

		var contCoordsMove = (pageYOffset + e.clientY) - getCoords(cont).top;
		var scrollYNow = parseInt(scroll.style.top);
		var scrolledPercent = Math.abs(scrollY - scrollYNow) * 100 /  canScrolled;

		if (contCoordsMove - onScrollClickedCoord < 0) {
			scroll.style.top = 0;
		} else if (contCoordsMove + scrollHeight - onScrollClickedCoord > contHeight ) {
			scroll.style.top = contHeight - scrollHeight + "px";
		} else {
			scroll.style.top = contCoordsMove - onScrollClickedCoord + "px";
		}
		console.log(scrolledPercent)
		// console.log(scroll.style.top, canScrolled, channelsHeight)

		if (scrollYNow > scrollY) {
			channels.scrollTop += (channelsHeight - contHeight) * scrolledPercent / 100;
			// scrolled =  (100 - ( 100 * (channels.scrollHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
			// scroll.style.top = scrolled + "px";

		} else if (scrollYNow < scrollY) {
			channels.scrollTop -= (channelsHeight - contHeight) * scrolledPercent / 100;
			// scrolled =  (100 - ( 100 * (channels.scrollHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
			// scroll.style.top = scrolled + "px";
		}

		scrollY = scrollYNow;

		e.stopPropagation();
		return false;
	}

	document.onmouseup = function (e) {
		document.onmousemove = null;
		document.body.style.cursor = "";
		
	}

	e.stopPropagation();
}

channels.onmousedown = function (e) {

	var pageY = e.clientY;
	
	document.onmousemove = function (e) {

		document.body.style.cursor = "pointer";

		var pageNowY = e.clientY;

		if (pageNowY < pageY) {
			channels.scrollTop += 6;
			scrolled =  (100 - ( 100 * (channels.scrollHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
			scroll.style.top = scrolled + "px";

		} else if (pageNowY > pageY) {
			channels.scrollTop -= 6;
			scrolled =  (100 - ( 100 * (channels.scrollHeight - channels.scrollTop) / channels.scrollHeight )) / 100 * channels.clientHeight;
			scroll.style.top = scrolled + "px";
		}

		pageY = pageNowY;

		return false;
	}

	document.onmouseup = function () {
		document.onmousemove = null;
		document.body.style.cursor = "";
	}
}


channels.addEventListener("click", loadStreams);


function loadStreams() {
	var targetName,
		targetSrc,
		target = event.target;

	try {

		while (target) {
			if (target.classList.contains("channel-wrapper")) break;
			target = target.parentNode;
		}

	} catch(e) {}

	var targetSrc = target.querySelector(".channel-name").href
	var targetName = target.querySelector(".channel-name").innerHTML.split(" ").join("+");

	if (!targetSrc) {
		getStreamType("streams", targetName);
	}
}

input.onkeyup = function(e) {

	var inputField = e.target;
	var fieldValue = inputField.value.toLowerCase();
	if (e.target.value.length < 3) return;

	var fragment = document.createDocumentFragment();
	for (var i = 0; i < streamChannels.length; i++) {
		var game = streamChannels[i];

		if (game.name.toLowerCase().indexOf(fieldValue) < 0) continue;

		var li = document.createElement("li");
		li.classList.add("channel-wrapper")

		var logo = document.createElement("img");
		logo.classList.add("icon");
		logo.src = game.logo;
		li.appendChild(logo);


		var channelNDwrapper = document.createElement("div");
		channelNDwrapper.classList.add("channel-nd-wrapper");

		var name = document.createElement("a");
		name.classList.add("channel-name");
		
		name.innerHTML = game.name;
		channelNDwrapper.appendChild(name);

		var channelDescr = document.createElement("div");
		channelDescr.innerHTML = "Viewers: " + game.viewers;
		channelNDwrapper.appendChild(channelDescr);

		li.appendChild(channelNDwrapper);

		var channelStatus = document.createElement("div");
		channelStatus.classList.add("status");

		li.appendChild(channelStatus);

		fragment.appendChild(li);
	}

	ul.innerHTML = "";
	ul.appendChild(fragment);
	scroll.style.top = 0;
	if (cont.offsetHeight > 499) {
		scroll.style.height =  Math.floor(channels.clientHeight * (channels.clientHeight * 100 / channels.scrollHeight) / 100) + "px";
	} else {
		scroll.style.height = 0;
	}
	
}

function getStreamType(type, game) {

	if (type === "games") {

		for (var i = 0; i <= 200; i += 100) {
			var link = 'https://api.twitch.tv/kraken/games/top?limit=100&offset=' + i;
			$.getJSON(link, function(data) {

					var length = data.top.length;
					for (var k = 0; k < length; k++) {

						var obj = data.top[k];
						var game = {};
						game.name = obj.game.name;
						game.viewers = obj.viewers;
						if (obj.game.logo.small) {
							game.logo = obj.game.logo.small;
						} else {
							game.logo = "none";
						}
						
						streamChannels[streamChannels.length] = game;
					}
			});
		}
	}

	if (type === "streams") {
		var link = "https://api.twitch.tv/kraken/streams?game=" + game + "&limit=100&offset=0";

		$.getJSON(link, function(data) {
			console.log(data)

				var length = data.streams.length
				var streams = data.streams;
				var fragment = document.createDocumentFragment();
				for (var i = 0; i < length; i++) {
					var stream = streams[i];

					var li = document.createElement("li");
					li.classList.add("channel-wrapper")

					var logo = document.createElement("img");
					logo.classList.add("icon");
					logo.src = stream.channel.logo || stream.preview.small;
					li.appendChild(logo);


					var channelNDwrapper = document.createElement("div");
					channelNDwrapper.classList.add("channel-nd-wrapper");

					var name = document.createElement("a");
					name.classList.add("channel-name");
					name.href = stream.channel.url;
					name.innerHTML = stream.channel.display_name;
					channelNDwrapper.appendChild(name);

					var channelDescr = document.createElement("div");
					channelDescr.innerHTML = "Viewers: " + stream.viewers;
					channelNDwrapper.appendChild(channelDescr);

					li.appendChild(channelNDwrapper);

					var channelStatus = document.createElement("div");
					channelStatus.classList.add("status");

					li.appendChild(channelStatus);

					fragment.appendChild(li);
				}

				ul.innerHTML = "";
				ul.appendChild(fragment);
				scroll.style.top = 0;
				
				if (cont.offsetHeight > 499) {
					scroll.style.height =  Math.floor(channels.clientHeight * (channels.clientHeight * 100 / channels.scrollHeight) / 100) + "px";
				} else {
					scroll.style.height = 0;
				}
		})
	}
}

getStreamType("games");
