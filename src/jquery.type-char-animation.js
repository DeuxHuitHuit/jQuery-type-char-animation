/*
 *  Sizing v2.0 - jQuery Type Char Animation
 *
 *  Copyright (c) 2012, 2014 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-type-char-animation/blob/master/LICENSE.txt)
 */

(function ($, undefined) {

	'use strict';
	
	var KEYDOWN = 'keydown.typeCharAnimation';

	var getCharTime = function (char, tPos) {
		return ((Math.random() * 10000) % 30) + 50;
	};
	
	var getSpaceTime = function (char, tPos) {
		return 150;
	};

	var isWhiteSpace = function (char, tPos) {
		return /\s/.test(char);
	};
	
	var typeCharAnimation = function(options) {
		var t = $(this);
		
		return t.each(function () {
			var t = $(this);
			// ensure options
			var o = $.extend({}, $.typeCharAnimation.defaults, options);
			
			// start animation
			startTypeChar(t, o);
		});
	};
	
	var keydown = function (e) {
		e.preventDefault();
		return false;
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
			return tPos === dT.length;
		}
	};
	
	var reverseStrategy = {
		initialPosition: function (dT) {
			return dT.length;
		},
		increment: -1,
		char: function (dT, tPos) {
			return dT[tPos];
		},
		newValue: function (dT, tPos, value) {
			return value.substring(0, value.length - 1);
		},
		isOver: function (dT, tPos) {
			return tPos === 0;
		}
	};
	
	var processMatrix = function (value, options) {
		if (!!options.matrixEffect) {
			var frozen = value.substring(0, Math.max(0, value.length - options.matrixEffect));
			var length = Math.min(options.matrixEffect, value.length);
			for (var x = 0; x < length; x++) {
				frozen += options.matrixValues[~~(Math.random() * 10000) % options.matrixValues.length];
			}
			return frozen;
		}
		return value;
	};
	
	var startTypeChar = function (t, options) {
		var txtBox = $(t);
		
		var dT = options.text.split('');
		
		var strategy = !options.reverse ? normalStrategy : reverseStrategy;
		
		var tPos = strategy.initialPosition(dT);
		
		var valueFx = txtBox[txtBox.is('input, textarea') ? 'val' : 'text'];
		
		var initialText = options.initialText || '';
		
		if (!!options.reverse) {
			initialText += options.text;
		}
		
		var currentValue = initialText;
		
		var typeChar = function () {
			// get current char
			var char = strategy.char(dT, tPos);
			
			// cache the new current value
			currentValue = strategy.newValue(dT, tPos, currentValue);
			
			// is this a whitespace ?
			var whiteSpace = options.isWhiteSpace(char, tPos);
			
			// matrix!
			var stepValue = processMatrix(currentValue, options);
			
			// set new value
			valueFx.call(txtBox, stepValue);
			
			// increment pointer
			tPos += strategy.increment;
			
			// focus the element
			txtBox.focus();
			
			// If the animation is not complete
			if (!strategy.isOver(dT, tPos)) {
				// loop!
				setTimeout(typeChar,
					whiteSpace ?
					options.spaceTime(char, tPos) :
					options.charTime(char, tPos)
				);
				if ($.isFunction(options.step)) {
					options.step.call(t, char, tPos);
				}
				
			} else {
				// clean up
				txtBox.off(KEYDOWN, keydown);
				
				if ($.isFunction(options.complete)) {
					options.complete.call(t);
				}
			}
		};
		
		// set initial text
		if (!!initialText) {
			valueFx.call(txtBox, initialText);
		}
		
		// block user input
		if (!!options.blockUserInput) {
			txtBox.on(KEYDOWN, keydown);
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
			matrixEffect: 0,
			matrixValues: 'abcdefghijklmnopqrstuvwxyz '.split(''),
			charTime: getCharTime, // function (char, tPos)
			spaceTime: getSpaceTime, // function (char, tPos)
			isWhiteSpace: isWhiteSpace // function (char, tPos)
		}
	};
	
})(jQuery);