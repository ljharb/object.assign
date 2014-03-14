"use strict";

// modified from https://github.com/es-shims/es6-shim
var keys = Object.keys || require('object-keys');

var assignShim = function assign(target, source) {
	return keys(source).reduce(function (target, key) {
		target[key] = source[key];
		return target;
	}, target);
};

assignShim.shim = function shimObjectAssign() {
    if (!Object.assign) {
        Object.assign = assignShim;
    }
    return Object.assign || assignShim;
};

module.exports = assignShim;

