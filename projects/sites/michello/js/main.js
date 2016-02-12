"use strict"

var resForm = document.getElementsByClassName('reservation-form')[0];
var gallery = document.querySelector(".gallery-list");


function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

resForm.onclick = function(e) {
	var target = e.target;

	if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") return;

	target.oninput = function() {
		
		if (this.value !== "") {
			this.nextElementSibling.style.display = "none";
		}

		this.onblur = function() {
			if (this.value == "") {
				this.nextElementSibling.style.display = "";
			}

			this.oninput = null;
		}
	}
}

gallery.onclick = function(e) {
	var target = e.target;

	if (target.tagName !== "A") return;

	var galleryList = document.querySelectorAll(".gallery-list li");
	var galleryItemDesc = document.querySelector(".gallery-product-desc");
	var pointer = document.querySelector(".gallery-pointer");

	if (target.parentNode.classList.contains("active")) {
		galleryItemDesc.classList.remove("active");
		target.parentNode.classList.remove("active")
		return false;
	}


	for (var i = 0; i < galleryList.length; i++) {
		galleryList[i].classList.remove("active");
	}

	target.parentNode.classList.add("active");

	var coords = getCoords(target.parentNode).top + target.parentNode.offsetHeight + 30 + "px" ;


	galleryItemDesc.classList.add("active");
	galleryItemDesc.style.top = coords;
	pointer.style.left = getCoords(target.parentNode).left + target.parentNode.offsetWidth/2 - 20 + "px";
	
	setTimeout(function() {
			galleryItemDesc.style.opacity = "1"
	}, 100);

	return false;
}