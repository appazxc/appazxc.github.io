"use strict";

(function() {
	
	(function(){

		var sliders = ["img/slider1.jpg","img/slider2.jpg","img/slider3.jpg","img/slider4.jpg","img/slider5.jpg"]
		preloadImages(sliders);
		var slideBtns = document.querySelector(".slide-pagination");
		
		slideBtns.addEventListener("click", function changeSlide(event) {

			var target = event.target;

			if (target.tagName !== "A") return;

			var slideNmbr = +target.innerHTML;

			if (slideNmbr > 0) {
				var slide = document.querySelector(".slider"),
					slideDescr = document.querySelectorAll(".slide"),
					pagination = document.querySelectorAll(".slide-pagination a");

				clearActiveClass(slideDescr);
				clearActiveClass(pagination);

				slide.style.backgroundImage = "url(" + sliders[slideNmbr - 1] + ")";
				slideDescr[slideNmbr - 1].classList.add("active");
				target.classList.add("active");
			}

			function clearActiveClass(elements) {

				for (var i = 0; i < elements.length; i++) {
					elements[i].classList.remove("active");
				}
			}
			event.preventDefault();
			return false;
		});

		function preloadImages(images){
			images.forEach(function(src){
				var img = new Image();
				img.src = src;
			});
		}
		
	})();

	(function(){
		var categoriesList = document.querySelectorAll(".category-list");
		var category = document.querySelectorAll(".category-name");


		for (var i = 4; i < category.length; i++) {
			category[i].nextElementSibling.style.right = 0;
		}

		for (var i = 0; i < categoriesList.length; i++) {
			var category = categoriesList[i];
			
			var items = category.querySelectorAll(".category-list__item")

			category.style.display = "block";

			if (items.length < 4) {
				category.style.width = items.length * 205 + 40 + "px";
			} else {
				category.style.width = 3 * 205 + 40 + "px";
				category.children[3].style.borderLeft = "1px solid transparent";
			}

			var maxHeight = 0;
			for (var j = 0; j < items.length; j++) {
				var h = items[j].offsetHeight;

				if (h > maxHeight) {
					maxHeight = h;
				}
			}

			for (var j = 0; j < items.length; j++) {
				items[j].style.height = maxHeight + "px";
			}

			category.style.display = "";
		}
	})();

})()