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


$(function(){
	$("#goldlikBasket").stayTop();
	})

