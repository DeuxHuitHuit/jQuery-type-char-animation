/*
 *  Sizing v2.0 - jQuery Type Char Animation
 *
 *  Copyright (c) 2012, 2014 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-type-char-animation/blob/master/LICENSE.txt)
 */

(function ($, undefined) {

	'use strict';

	var getCharTime = function (char, tPos) {
		return ((Math.random() * 10000) % 30) + 50;
	};
	
	var getSpaceTime = function (tPos) {
		return 150;
	};
	
	var typeCharAnimation = function(options) {
		var t = $(this);
		
		// ensure options
		var o = $.extend({}, $.typeCharAnimation.defaults, options);
		
		if (t.length != 1) {
			if (!!window.console) {
				console.error('[type-char] can only be called on single elements');
			}
		} else {
			// start animation
			startTypeChar(t, o);
		}
	};
	
	var normalStrategy = {
		initialPosition: function (dT) {
			return 0;
		},
		increment: 1,
		char: function (dT, tPos) {
			return dT[tPos];
		},
		newValue: function (dT, tPos, value) {
			return value + dT[tPos];
		},
		isOver: function (dT, tPos) {
			return tPos < dT.length;
		}
	};
	
	var reverseStrategy = {
		initialPosition: function (dT) {
			return dT.length;
		},
		increment: -1,
		char: function (dT, tPos) {
			
		},
		newValue: function (dT, tPos) {
			
		},
		isOver: function (dT, tPos) {
			return tPos === 0;
		}
	};
	
	var startTypeChar = function (t, options) {
		var txtBox = $(t);
		
		var dT = options.text.split('');
		
		var strategy = !options.reverse ? normalStrategy : reverseStrategy;
		
		var tPos = strategy.initialPosition(dT);
		
		var valueFx = txtBox[txtBox.is('input, textarea') ? 'val' : 'text'];
			
		var typeChar = function () {
			var char = strategy.char(dT, tPos);
			var currentValue = valueFx.call(txtBox);
			var newValue = strategy.newValue(dT, tPos, currentValue);
			
			// set new value
			valueFx.call(txtBox, newValue);
			
			// increment pointer
			tPos += strategy.increment;
			
			// focus the element
			txtBox.focus();
			
			if (strategy.isOver(dT, tPos)) {
				setTimeout(typeChar,
					char == ' ' ?
					options.spaceTime(tPos) :
					options.charTime(char, tPos)
				);
				if ($.isFunction(options.step)) {
					options.step.call(t, char, tPos);
				}
				
			} else {
				if ($.isFunction(options.complete)) {
					options.complete.call(t);
				}
			}
		};
		
		// set initial text
		if (!!options.initialText) {
			valueFx.call(txtBox, options.initialText);
		}
		
		// focus
		txtBox.focus();
		
		// type first char
		typeChar();
	};
	
	
	// ACTUAL PLUGIN
	$.fn.extend({
		typeCharAnimation: typeCharAnimation
	});
	
	// defaults
	$.typeCharAnimation = {
		defaults: {
			initialText: null, // string
			text: null, // string
			step: null, // function (char, tPos)
			complete: null, // function ()
			blockUserInput: false,
			reverse: false,
			charTime: getCharTime, // function (char, tPos)
			spaceTime: getSpaceTime // function (tPos)
		}	
	};
	
})(jQuery);