# jQuery Type Char Animation

> Emulates a user typing some text

Works with regular DOMElements as well as Forms Elements.

## Demo

See [this file](https://github.com/DeuxHuitHuit/jQuery-type-char-animation/blob/master/tests/jquery.type-char-animation.js.adhoc-test.html).

## Installation

`npm i jquery.type-char-animation --save-dev`

### Usage

[See below](#options) for the complete documentation

````javascript
// start the animation
$('#my-div').typeCharAnimation({
    initialText: null, // string
    initialDelay: 0,
    text: null, // string
    step: null, // function (char, pos)
    complete: null, // function ()
    blockUserInput: false,
    focus: true,
    reverse: false,
    matrixEffect: 0,
    passes: 1,
    matrixValues: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    charTime: getCharTime, // function (char, pos)
    spaceTime: getSpaceTime, // function (char, pos)
    isWhiteSpace: isWhiteSpace // function (char, pos)
});
// stop the animation
$('#my-div').typeCharAnimation('stop');
// stop and go to end
$('#my-div').typeCharAnimation('stop', {end: true});
// access (or change) the global defaults
$.typeCharAnimation.defaults;
````

## Options

These are the possible config values. The format is `optionName: defaultValue`.

### text: null
> Any string

The text to animate. This option is required.

### initialText: null
> Any string

The initial text to prepend to the text. Will not be animated.

### initialDelay: 0
> Any positive integer

The initial delay (in ms) before the animation starts

### step: null
> function (char, pos) {}

A callback function called at each step (or frame) of the animation.

### complete: null
> function () {}

A callback function called once, at the end of the animation.

### blockUserInput: false
> true | false

Flag indicating if the plugin should prevent user input in this element while animating. Mostly usefull for editable elements.

### focus: true
> true | false

Flag indicating if the plugin should focus the element after changing its value.

### reverse: false
> true | false

Flag indicating if the animation should run in reverse (characters are removed instead of added).

### matrixEffect: 0
> Any positive integer

Changes the `matrixEffect` last characters to random ones, for one pass.

### passes: 1
> Any positive integer

Number of steps (or frames) to wait between animations. Usefull with `matrixEffect`.

### matrixValues: 'abcdefghijklmnopqrstuvwxyz'.split('')
> Array

Possible random values to use when `matrixEffect > 0`.

### charTime
> function (char, pos) {}

A function that must return the duration in milisecond of a given frame, when the character is not a white space.

### spaceTime
> function (char, pos) {}

A function that must return the duration in milisecond of a given frame, when the character is a white space.

### isWhiteSpace
> function (char, pos) {}

A function that must return true if the given char should be considered as a white space character.

## Credits

Made with love in Montréal by <https://deuxhuithuit.com/>

Licensed under the MIT License: <http://deuxhuithuit.mit-license.org/>
