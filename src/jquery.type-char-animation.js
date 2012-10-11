/*
 *  Sizing v1.0 - jQuery Type Char Animation
 *
 *  Copyright (c) 2012 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-type-char-animation/blob/master/LICENSE.txt)
 */

(function ($, undefined) {

	"use strict";

	var
	
	getCharTime = function (char, tPos) {
		return ((Math.random() * 10000) % 30) + 50;
	},
	
	getSpaceTime = function (tPos) {
		return 150;
	},
	
	typeCharAnimation = function(options) {
		var 
		
		t = $(this),
		
		// ensure options
		o = $.extend({}, $.typeCharAnimation.defaults, options);
		
		if (t.length != 1) {
			if (!!window.console) {
				console.err('[type-char] can only be called on single elements');
			}
		} else {
			// start animation
			startTypeChar(t, o);
		}
	},
	
	startTypeChar = function (t, options) {
		
		var 
		
		txtBox = $(t),
		
		dT = options.text.split(''),
		
		tPos = 0,
		
		valueFx = txtBox[txtBox.is('input, textarea') ? 'val' : 'text'],
			
		typeChar = function () {
			var char = dT[tPos];
			
			// add a new char
			valueFx.call(txtBox, valueFx.call(txtBox) + char);
			
			// increment pointer
			tPos++;
			
			// focus the element
			txtBox.focus();
			
			if (tPos < dT.length) {
				setTimeout(typeChar, char == ' ' ? options.spaceTime(tPos) : options.charTime(char, tPos));
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
		valueFx.call(txtBox, options.initialText);
		
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
			charTime: getCharTime, // function (char, tPos)
			spaceTime: getSpaceTime // function (tPos)
		}	
	};
	
})(jQuery);