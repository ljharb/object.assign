'use strict';

// modified from https://github.com/es-shims/es6-shim
var keys = require('object-keys');
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = require('./hasSymbols')();
var defineProperties = require('define-properties');
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
var isEnumerableOn = function (obj) {
	return function isEnumerable(prop) {
		return propIsEnumerable.call(obj, prop);
	};
};

var assignShim = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = Object(target);
	var s, source, i, props;
	for (s = 1; s < arguments.length; ++s) {
		source = Object(arguments[s]);
		props = keys(source);
		if (hasSymbols && Object.getOwnPropertySymbols) {
			props.push.apply(props, Object.getOwnPropertySymbols(source).filter(isEnumerableOn(source)));
		}
		for (i = 0; i < props.length; ++i) {
			objTarget[props[i]] = source[props[i]];
		}
	}
	return objTarget;
};

defineProperties(assignShim, {
	shim: function shimObjectAssign() {
		var assignHasPendingExceptions = function () {
			if (!Object.assign || !Object.preventExtensions) {
				return false;
			}
			// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
			// which is 72% slower than our shim, and Firefox 40's native implementation.
			var thrower = Object.preventExtensions({ 1: 2 });
			try {
				Object.assign(thrower, 'xy');
			} catch (e) {
				return thrower[1] === 'y';
			}
		};
		defineProperties(
			Object,
			{ assign: assignShim },
			{ assign: assignHasPendingExceptions }
		);
		return Object.assign || assignShim;
	}
});

module.exports = assignShim;

