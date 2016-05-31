(function ($, undefined) {
	var prefix = "jquery-scrollable____",
		emptyFn = function () {},
		defaults = {
			listSelector: "li",
			width: "auto",
			height: "auto",
			direction: "top",
			scrollCount: 1,
			delay: 500,
			duration: 678,
			isAutoPlay: true,
			isHoverPause: true,
			onbeforechange: emptyFn,
			onafterchange: emptyFn
		};
	$.fn.scrollable = function (settings) {
		var args = arguments;
		return this.each(function () {
			var $this = $(this),
				data = $this.data(prefix),
				options = $.extend({}, defaults, $.type(settings) === 'object' && settings);

			if (!data) {
				$this.data(prefix, (data = new Scrollable($this, options)));
				data._init();
			}

			if ($.type(settings) === 'string' && Scrollable.prototype[settings]) data[settings]();
			else if ($.type(settings) === 'number') data.to.apply(data, args);
		});
	};

	$.fn.scrollable.defaults = defaults;
	function Scrollable(element, options) {
		this.$element = $(element);
		this.options = options;
	}

	Scrollable.prototype = {
		_init: function () {
			var _this = this,
				options = _this.options,
				$element = _this.$element,
				$content = $($element).children(options.listSelector),
				count = $content.length;

			if (!count || count < 2) return;

			var contentWidth = $element.width(),
				contentHeight = $element.height(),
				$elementClone = $element.clone(true, true),
				isHorizontal = options.direction === "left" || options.direction === "right",
				$wrapper;

			if (options.width === "auto") options.width = $element.width();
			if (options.height === "auto") options.height = $element.height();

			if (contentWidth * count <= options.width && isHorizontal || contentHeight * count <= options.height && !isHorizontal) return;


			$element.wrap("<div>");
			$wrapper = $element.parent();
			$wrapper.css({
				position: "relative",
				overflow: "hidden",
				width: options.width,
				height: options.height
			});
			$element.wrap("<div>");
			$animate = $element.parent();
			$animate.css({
				position: "absolute",
				overflow: "hidden",
				top: 0,
				left: 0
			});
			$elementClone.insertAfter($element);
			if (isHorizontal) {
				_this.animateKey = "left";
				$animate.css({
					width: "99999%",
					height: options.height
				});
				$element.add($elementClone).css("float", "left");
				contentWidth = $element.outerWidth();
				$animate.width(contentWidth * 2).height(options.height);
			} else {
				_this.animateKey = "top";
				$animate.css({
					width: options.width,
					height: contentHeight * 2
				});
			}

			_this.$animate = $animate;


			// fps
			_this.$list = $element.children("li");
			_this.$elementClone = $elementClone;
			_this.$listClone = $elementClone.children("li");
			_this.count = _this.$list.length;
			_this.perAnimateLeft = contentWidth * 30 / options.duration;
			_this.perAnimateTop = contentHeight * 30 / options.duration;
			_this.isMarquee = options.scrollCount === 0;
			_this.animateLen = 0;
			_this.showIndex = 0;
			_this.isAnimating = 0;
			_this.isHorizontal = isHorizontal;
			_this.intervalId = 0;
			_this.timeoutId = 0;
			_this.contentWidth = contentWidth;
			_this.contentHeight = contentHeight;


			if (options.isAutoPlay) _this.play();

			$wrapper.hover(function () {
				_this.pause();
			}, function () {
				_this.pause();
				if (options.isAutoPlay) _this.play();
			});
		},

		_run: function (type, callback) {
			var _this = this,
				options = _this.options,
				$element = _this.$element;

			if (_this.isAnimating) return;

			var clonePosKey = _this.$elementClone.position()[_this.animateKey],
				animateProperty = {},
				$temp = _this.$list;

			if ((type != "prev" && options.direction == "top") || (type == "prev" && options.direction == "bottom")) {
				if (_this.isMarquee) {
					if (_this.animateLen - _this.perAnimateTop <= -_this.contentHeight) {
						_this.animateLen += _this.contentHeight;
					}
					_this.animateLen -= _this.perAnimateTop;
				} else {
					if (_this.contentHeight + Math.floor(_this.animateLen) <= 0) {
						_this.animateLen = _this.contentHeight + _this.animateLen;
						_this.$animate.css("margin-" + _this.animateKey, _this.animateLen);
					}

					_this.showIndex += options.scrollCount;
					if (_this.showIndex >= _this.count) {
						_this.showIndex = (_this.showIndex + _this.count) % _this.count;
						$temp = _this.$listClone;
					}

					_this.animateLen = -$temp.eq(_this.showIndex).position()[_this.animateKey];
				}
			}
			else if ((type != "prev" && options.direction == "right") || (type == "prev" && options.direction == "left")) {
				if (_this.isMarquee) {
					if (_this.animateLen + _this.perAnimateLeft >= 0) {
						_this.animateLen -= _this.contentWidth;
					}
					_this.animateLen += _this.perAnimateLeft;
				} else {
					_this.showIndex -= options.scrollCount;

					if (_this.showIndex < 0 && Math.floor(_this.animateLen) + _this.contentWidth >= 0) {
						_this.animateLen -= _this.contentWidth;
						_this.$animate.css("margin-" + _this.animateKey, _this.animateLen);
					}

					_this.showIndex = (_this.showIndex + _this.count) % _this.count;
					_this.animateLen = -$temp.eq(_this.showIndex).position()[_this.animateKey];
				}
			}
			else if ((type != "prev" && options.direction == "bottom") || (type == "prev" && options.direction == "top")) {
				if (_this.isMarquee) {
					if (_this.animateLen + _this.perAnimateTop >= 0) {
						_this.animateLen -= _this.contentHeight;
					}
					_this.animateLen += _this.perAnimateTop;
				} else {
					_this.showIndex -= options.scrollCount;

					if (_this.showIndex < 0 && Math.floor(_this.animateLen) + _this.contentHeight >= 0) {
						_this.animateLen -= _this.contentHeight;
						_this.$animate.css("margin-" + _this.animateKey, _this.animateLen);
					}

					_this.showIndex = (_this.showIndex + _this.count) % _this.count;
					_this.animateLen = -$temp.eq(_this.showIndex).position()[_this.animateKey];
				}
			}
			else if ((type != "prev" && options.direction == "left") || (type == "prev" && options.direction == "right")) {
				if (_this.isMarquee) {
					if (_this.animateLen - _this.perAnimateLeft <= -_this.contentWidth) {
						_this.animateLen += _this.contentWidth;
					}
					_this.animateLen -= _this.perAnimateLeft;
				} else {
					if (_this.contentWidth + Math.floor(_this.animateLen) <= 0) {
						_this.animateLen = _this.contentWidth + _this.animateLen;
						_this.$animate.css("margin-" + _this.animateKey, _this.animateLen);
					}

					_this.showIndex += options.scrollCount;
					if (_this.showIndex >= _this.count) {
						_this.showIndex = (_this.showIndex + _this.count) % _this.count;
						$temp = _this.$listClone;
					}

					_this.animateLen = -$temp.eq(_this.showIndex).position()[_this.animateKey];
				}
			}


			animateProperty["margin-" + _this.animateKey] = _this.animateLen;
			if (!_this.isMarquee) {
				_this.isAnimating = 1;
				options.onbeforechange.call($element[0]);
			}
			_this.isMarquee ? _this.$animate.css(animateProperty) : _this.$animate.animate(animateProperty, options.duration, function () {
				if ($.isFunction(callback)) callback();
				_this.isAnimating = 0;
				options.onafterchange.call($element[0]);
			});
		},

		play: function () {
			var _this = this,
				options = _this.options;
			if (_this.intervalId) return;
			if (_this.isMarquee) {
				if (_this.timeoutId) return;
				_this.timeoutId = setTimeout(function () {
					_this.intervalId = setInterval(function () {
						_this._run();
					}, 30);
				}, options.delay);
			} else {
				_this.intervalId = setInterval(function () {
					_this._run();
				}, options.delay);
			}
		},

		pause: function () {
			var _this = this,
				options = _this.options;
			if (options.isHoverPause) {
				if (_this.intervalId) clearInterval(_this.intervalId);
				_this.intervalId = 0;
			}
			if (_this.isMarquee && options.isAutoPlay) {
				if (_this.timeoutId) clearTimeout(_this.timeoutId);
				_this.timeoutId = 0;
			}
		},

		to: function (index, duration, callback) {
			var _this = this,
				options = _this.options,
				$element = _this.$element;

			if (_this.isAnimating) return;

			var toPos = _this.$list.eq(index).position()[_this.animateKey],
				delta = Math.abs(Math.abs(toPos) - Math.abs(_this.animateLen)),
				animateProperty = {},
				time = options.duration;

			if (delta <= 0) return;

			if ($.isFunction(duration)) {
				callback = duration;
				duration = 0;
			}
			if (duration) time = duration;

			_this.pause();

			if (_this.isMarquee && !duration) time = _this.isHorizontal ? delta * 30 / _this.perAnimateLeft : delta * 30 / _this.perAnimateTop;

			_this.animateLen = -toPos;
			animateProperty["margin-" + _this.animateKey] = _this.animateLen;
			_this.showIndex = index;
			_this.isAnimating = 1;

			options.onbeforechange.call($element[0]);
			_this.$animate.stop(1, 1).animate(animateProperty, time, _this.isMarquee ? "linear" : "swing", function () {
				if (options.isAutoPlay) _this.play();
				_this.isAnimating = 0;
				if ($.isFunction(callback)) callback.call($element[0]);
				options.onafterchange.call($element[0]);
			});
		},

		prev: function () {
			var _this = this,
				options = _this.options;

			if (!_this.isMarquee) {
				_this.pause();
				_this._run('prev', function () {
					if (options.isAutoPlay) _this.play();
				});
			}
		},

		next: function () {
			var _this = this,
				options = _this.options;

			if (!_this.isMarquee) {
				_this.pause();
				_this._run('next', function () {
					if (options.isAutoPlay) _this.play();
				});
			}
		}
	};
})(jQuery);
