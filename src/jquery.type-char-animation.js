/*
 *  Sizing v1.0 - jQuery Type Char Animation
 *
 *  Copyright (c) 2012 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-type-char-animation/blob/master/LICENSE.txt)
 */

(function ($, undefined) {

	"use strict";
	
	var
	
	_typeCharEmulator = function(options) {
		// ensure options
		options = $.extend({
						initialText : '',
						text : '',
						callback: null
					}, options);
		
		startTypeChar(this,options);
	},
	
	startTypeChar = function (t,options) {//text, txtBox, callback, initialText) {
		
		var 
		
		txtBox = $(t),
		
		dT = options.text.split(''),
		
		tPos = 0,
			
		typeChar = function () {
			txtBox.val( txtBox.val() + dT[tPos]);
			
			tPos++;
			
			if (tPos < dT.length) {
				setTimeout(typeChar, dT[tPos] == ' ' ? 150 : ((Math.random() * 10000) % 30) + 50 );
			} else {
				txtBox.focus();
				
				if (options.callback != null && $.isFunction(options.callback)) {
					options.callback.call(this);
				}
			}
			txtBox.scrollTo('max');
		};
		
		// set initial text
		txtBox.val(options.initialText);
		
		// focus
		txtBox.focus();
		
		// type first char
		typeChar();
	},
	
	/* UTILITIES *************************************************************/

	/**
	 * Utility method to facilitate working with jQuery objects
	 * in all plugins
	 * 
	 * @param callback
	 * @param arguments
	 * @return jQuery
	 */
	each = function (callback, args) {
		var t = $(this);

		if (!!t && !!t.length && $.isFunction(callback)) {
			t.each(function eachCallback () {
				callback.apply(this, args);
			});
		}

		return t;
	};
	
	// ACTUAL PLUGINS
	$.fn.extend({
		typeCharEmulator : function() {return each.call(this,_typeCharEmulator,arguments);}
	});
	
	$.extend({
		typeCharEmulator : {}
	});
	
})(jQuery);