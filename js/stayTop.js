$.fn.stayTop = function() {
	var position = function(element) {
		var top = element.position().top, pos = element.css("position");
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			if (scrolls > top) {
				if (window.XMLHttpRequest) {
					element.css({
						position: "fixed",
						top: 0
					});
				} else {
					element.css({
						top: scrolls
					});
				}
			}else {
				element.css({
					position: "relative",
					top:0
				});
			}
		});
	};
	return $(this).each(function() {
		position($(this));
	});
};

$.fn.stayNearTop = function() {
	var position = function(element) {
		var top = element.position().top, pos = element.css("position");
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			if (scrolls > top) {
				if (window.XMLHttpRequest) {
					element.css({
						position: "fixed",
						top: 100
					});
				} else {
					element.css({
						top: scrolls
					});
				}
				if (scrolls > 2650) {
					element.css({
						visibility:"hidden"
					}
					);
				}
				else {
					element.css({
						visibility:"visible"
					}
					);
				}
			}else {
				element.css({
					position: "relative",
					top:0
				});
			}
		});
	};
	return $(this).each(function() {
		position($(this));
	});
};

$(function(){ 
	$("#goldlikBasket").stayTop();
   })
$(function(){ 
	$("#productNav").stayNearTop();
   })
