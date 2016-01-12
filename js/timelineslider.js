/**
 * The Slider Position works based comparing the position of the page
 * to the position of the slider and then comparing that position to
 * the placement of labels on the page
 * WORK IN PROGRESS
 */

 (function($) {

 	$.fn.timelineSlider = function(options) {
 		var settings = $.extend({
 			range: [2000, new Date().getFullYear()],
    		theme: 'default', // Options: dark, purple, blackandred
    		averageSections: 10, // Options < 20
    		// position: 'bottom', // Options: top, bottom ( default: bottom)
    		onDragged: null,
    		onStopped: null,
    		position: 'bottom'
    	}, options);

 		var years_range = get_range(settings.range[0], settings.range[1]);

 		function initPlugin () {
 			$('.slider>span').html(years_range[0]);

 			$('.slider').draggable({
 				axis: 'x',
 				containment: "parent",
 				drag: function( event, ui ) {
					var value = getSliderPosition($(this));
					$('.slider>span').html(value);
					if(settings.onDragged != null) {
						settings.onDragged(value);
					}
		 		},
		 		stop: function (event, ui) {
		 			var value = getSliderPosition($(this));
					if(settings.onStopped != null) {
						settings.onStopped(value);
					}
		 		}
 			});
 		}

 		function getSliderPosition (context) {
 			var label_position = new Array;

			// Number of years 
			var range = settings.range[1] - settings.range[0];
			
			var window_width = window.innerWidth;

			// Average Width between each metric line
			var average_width = (window_width / range);

			// Running width count for foreach loop, initializing with value
			for(var i = 1; i < range; i++) {
				label_position.push(((average_width * i) / window.innerWidth) * 100);
			}


			// Getting X Offset form page
			var offset = context.offset();
			var xPos = offset.left;

			// Percentage moved over the page
			// Added 50px to xPos to accommodate for the offset of the tooltip line from the page
			var percentage = ( (xPos + 50) / window.innerWidth ) * 100;
			var finalValue = years_range[0];

			// If the slider is located before first year label
			if(percentage <= label_position[0]) {
				finalValue = years_range[0];
			}
			// If the slider is located after last year label
			else if(percentage >= label_position[label_position.length - 1]) {
				finalValue = years_range[years_range.length - 1];
			} else {
				for(var i = 0; i <= label_position.length; i++) {
					var min = label_position[i];
					var max = label_position[i+1];

					// Loop through the years and compare if value is between two values
					// then take the first value as the year
					if((i+1) < label_position.length) {
						if(percentage >=  min && percentage <= max) {
							finalValue = years_range[i + 1];
						}
					}			
				}
			}

			return finalValue;
		}

		function checkValues () {
			if(settings.averageSections > 20) {
				jQuery.error('Timeline: averageSections cannot have value higher than 20');
			}

			if(settings.position != 'bottom' && settings.position != 'top') {
				jQuery.error('Timeline: Position can only have value: top or bottom')
			}

			if(!(settings.range instanceof Array)) {
				jQuery.error('Timeline: range need to be array. Ex. [2001, 2015]');
			} else if(settings.range.length > 2) {
				jQuery.error('Timeline: range need to be array. Ex. [2001, 2015] with ONLY 2 values');
			} else if(settings.range[0] == undefined || settings.range[1] == undefined){
				jQuery.error('Timeline: range need to be array. Ex. [2001, 2015]');
			} else if((settings.range[1] - settings.range[0]) < 0) {
				jQuery.error('Timeline: range[1] should be greater than range[0]');
			}

			if(settings.onDragged != null && !$.isFunction(settings.onDragged)) {
				jQuery.error('Timeline: onValueChanged value need to be a function');
			}            

		}

		function get_range(a,b){
			var r = [];
			for(var i=a;i<=b;i++){
				r.push(i);
			}
			return r;
		}

		$(window).resize(function() {
			$('.bottom_small_metrics').html('');
			$('.top_small_metrics').html('');
			$('.top_big_metrics').html('');
			$('.bottom_big_metrics').html('');
			$('.year_labels').html('');

			append_small_metric();
			append_big_metric();
			add_year_labels();
		});

		function append_small_metric () {
			// Number of years 
			var range = settings.range[1] - settings.range[0];

			// Total Number of metric lines to be made
			var total_metrics = range * settings.averageSections;

			var window_width = window.innerWidth;

			// Average Width between each metric line
			var average_width = (window_width / total_metrics);

			// var metric_html = ;

			// Running width count for foreach loop, initializing with value
			// var width_count = average_width;
			for(var i = 1; i < total_metrics; i++) {
				var html = '<div class="small_metric" style="left: ' + (average_width * i) + 'px"></div>';

				$('.bottom_small_metrics').append(html);
				$('.top_small_metrics').append(html);
			}
		}

		function append_big_metric () {
			// Number of years 
			var range = settings.range[1] - settings.range[0];

			// Total Number of metric lines to be made
			var total_metrics = range;

			var window_width = window.innerWidth;

			// Average Width between each metric line
			var average_width = (window_width / total_metrics);

			// var metric_html = ;

			// Running width count for foreach loop, initializing with value
			// var width_count = average_width;
			for(var i = 1; i < total_metrics; i++) {
				var html = '<div class="small_metric" style="left: ' + (average_width * i) + 'px"></div>';

				$('.top_big_metrics').append(html);
				$('.bottom_big_metrics').append(html);
			}
		}

		function add_year_labels () {
			// Number of years 
			var range = settings.range[1] - settings.range[0];

			// Total Number of metric lines to be made
			var total_metrics = range;

			var window_width = window.innerWidth;

			// Average Width between each metric line
			var average_width = (window_width / total_metrics);

			// Running width count for foreach loop, initializing with value
			// var width_count = average_width;
			for(var i = 1; i < total_metrics; i++) {
				var html = '<span style="left: ' + ((average_width * i) - 15) + 'px">' + (settings.range[0] + i) /*Math.round(label_position[i - 1])*/ + '</span>';
				$(document).find('.year_labels').append(html);
			}
		}

		function initUI (context) {
			context.addClass('timeline');
			var labelsUI = $("<div class='year_labels'></div>");
			context.append(labelsUI);
			
			var metrics = '<div class="metrics"><div class="top_small_metrics"></div><div class="top_big_metrics"></div><div class="bottom_big_metrics"></div><div class="bottom_small_metrics"></div></div>';
			context.append($(metrics));

			var slider = '<div class="slider"><span>2015</span><div class="arrow-down"></div><div class="line"></div></div>';
			context.append(slider);

			// TBD
			// $(document).find('.slider').mousedown(function() {
			// 	$(this).css('opacity', 0.5);
			// });

			// $(document).find('.slider').mouseup(function() {
			// 	$(this).css('opacity', 1);
			// });

			append_small_metric();
			append_big_metric();
			add_year_labels();
		}

		return this.each( function() {
			checkValues();
			initUI($(this));
			initPlugin($(this));
		});
	}
}(jQuery));