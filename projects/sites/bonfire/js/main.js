"use strict"

bonfire();

function bonfire() {
	var popupCloseBtn = document.querySelector(".popup-stripe__close"),
		popup = document.querySelector(".popup-stripe"),
		menuBurger = document.querySelector(".icon-menu"),
		searchIcon = document.querySelector(".search-icon"),
		imageSmallCont = document.querySelector(".product-images__small_container"),
		selectField = document.querySelector(".selects-container"),
		qtyInput = document.querySelector(".iQty-wrapper > input");

	setTimeout(function(){
		popup.classList.remove("active");
	}, 97000)

	popupCloseBtn.onclick = function() {
		console.log("aaaa")
		popup.classList.remove("active");
		return false;
	}

	menuBurger.onclick = function() {
		this.classList.toggle("active");
		return false;
	}

	searchIcon.onclick = function(e) {
		var search = document.querySelector(".search");
		var searchInput = document.getElementById("search");

		search.classList.toggle("active");
		
		if (search.classList.contains("active")) {
			searchInput.focus();
		}

		searchInput.onblur = function(e) {
			setTimeout(function() {
				search.classList.remove("active");
			}, 200)
		}

		return false;
	}

	imageSmallCont.onclick = function(e) {
		var target = e.target;
		var imageBig = document.querySelector(".product-image__big > a > img");

		if (target.tagName !== "IMG") return;

		var li = imageSmallCont.querySelectorAll("ul > li");
		var length = li.length;

		for (var i = 0; i < length; i++) {
			li[i].classList.remove("active");
		}

		imageBig.src = target.src;

		var parent = target.parentNode
		parent = parent.parentNode
		parent.classList.add("active");

		return false;
	}

	selectField.onclick = function(e) {
		var target = e.target;

		if (!target.classList.contains("cSelect-current") && !target.classList.contains("qty-btn")) return;

		if (target.classList.contains("cSelect-current")) {
			var selectList = target.nextElementSibling;
			selectList.classList.toggle("active");
			
			selectList.onclick = function(e) {
				var targetListItem = e.target;
					
				if (targetListItem.tagName === "LI") {
					var trueSelectOption = target.parentNode.previousElementSibling.firstElementChild
					
					target.innerHTML = targetListItem.innerHTML;
					selectList.classList.remove("active");
					trueSelectOption.value = target.innerHTML;
					trueSelectOption.innerHTML = target.innerHTML;
				}
			}
		}

		if (target.classList.contains("qty-btn")) {
			var qty = target.parentNode.firstElementChild;

			if (target.classList.contains("qty-btn__top")) {
				qty.value++
			}

			if (target.classList.contains("qty-btn__bottom") && qty.value > 1) {
				qty.value--
			}
		}
		return false;
	}

	qtyInput.onkeypress = function(e) {
		e = e || event;

		if (e.ctrlKey || e.altKey || e.metaKey) return;
		function getChar(event) {
			return String.fromCharCode(event.keyCode || event.charCode);
		}
		var chr = getChar(e);

		if (chr == null) return;

		if (chr < '0' || chr > '9') {
			return false;
		}
	}
}