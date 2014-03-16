"use strict";

// modified from https://github.com/es-shims/es6-shim
var keys = require('object-keys');

var assignShim = function assign(target, source) {
	var props = keys(source);
	for (var i = 0; i < props.length; ++i) {
		target[props[i]] = source[props[i]];
	}
	return target;
};

assignShim.shim = function shimObjectAssign() {
    if (!Object.assign) {
        Object.assign = assignShim;
    }
    return Object.assign || assignShim;
};

module.exports = assignShim;

