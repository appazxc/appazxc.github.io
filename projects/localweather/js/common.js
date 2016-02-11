"use strict"

function Weather() {
	var temp = function(who, temp) {
		if (who == 'f') {
			return Math.ceil(temp) + " F°"
		} else if ('c') {
			return Math.ceil((temp - 32) / 1.8) + " C°";
		}
	} ;

	var backgroundPic = ["img/cold.jpg", "img/norm.jpg", "img/plus.jpg", "img/hot.jpg"]


	this.getWeather = function(who) {

		$.getJSON("http://ipinfo.io/", function(data){
			console.log(data);
			var city = data["city"]
			var lat = data["loc"].split(",")[0]
			var lon = data["loc"].split(",")[1]

			setWeather(city, lon, lat, who)
		});

		function setWeather(city, lon, lat, who) {
			var cityDiv = document.querySelector(".city")
			var tempDiv = document.querySelector(".temp")

			$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=2de143494c0b295cca9337e1e96b00e0", function(data){
				var temperature = temp(who, data["main"]["temp"]);
				console.log(data)
				cityDiv.innerHTML = city;
				tempDiv.innerHTML = temperature;
				setIconWeather(parseInt(temp("c", data["main"]["temp"])))
			})


		}
	}

	function setIconWeather(temp) {

		var iconP = document.querySelector(".icon").style;
		var body = document.body.style;
		if (temp <= -10) {
			iconP.backgroundPosition = "-465px -216px";
			body.background = "url(" + backgroundPic[0] + ") no-repeat center center";
		};
		if (temp <= 0) {
			iconP.backgroundPosition = "-124px -94px";
			body.background = "url(" + backgroundPic[1] + ") no-repeat center center";
		};
		if (temp > 0) {
			iconP.backgroundPosition = "-116px -217px";
			body.background = "url(" + backgroundPic[2] + ") no-repeat center center";
		};
		if (temp > 10) {
			iconP.backgroundPosition = "-357px -86px";
			body.background = "url(" + backgroundPic[3] + ") no-repeat center center";
		};
	}
}


var weather = new Weather();

weather.getWeather("c")

