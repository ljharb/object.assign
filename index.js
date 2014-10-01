'use strict';

// modified from https://github.com/es-shims/es6-shim
var keys = require('object-keys');
var isObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};

var assignShim = function assign(target, source1) {
	var objTarget, s, source, i, props;
	if (!isObject(target)) { throw new TypeError('target must be an object'); }
	objTarget = Object(target);
	for (s = 1; s < arguments.length; ++s) {
		source = arguments[s];
		props = keys(Object(source));
		for (i = 0; i < props.length; ++i) {
			objTarget[props[i]] = source[props[i]];
		}
	}
	return objTarget;
};

assignShim.shim = function shimObjectAssign() {
	if (!Object.assign) {
		Object.assign = assignShim;
	}
	return Object.assign || assignShim;
};

module.exports = assignShim;

