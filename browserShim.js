'use strict';

var keys = require('object-keys').shim();
delete keys.shim;

var assign = require('./');

module.exports = assign.shim();

delete assign.shim;
