"use strict";

// modified from https://github.com/es-shims/es6-shim
var keys = require('object-keys');
var isObject = function (obj) {
	return obj && typeof obj === 'object';
};

var assignShim = function assign(target, source) {
	var s, i, props;
	if (!isObject(target)) { throw new TypeError('target must be an object'); }
	for (s = 1; s < arguments.length; ++s) {
		source = arguments[s];
		if (!isObject(source)) { throw new TypeError('source ' + s + ' must be an object'); }
		props = keys(Object(source));
		for (i = 0; i < props.length; ++i) {
			target[props[i]] = source[props[i]];
		}
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

