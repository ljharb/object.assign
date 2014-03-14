#object.assign <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4] [![dependency status][5]][6] [![dev dependency status][7]][8]

[![npm badge][12]][1]

[![browser support][9]][10]

An Object.assign shim. Invoke its "shim" method to shim Object.assign if it is unavailable.

Most common usage:
```js
var assign = Object.assign || require('object.assign');
```

## Example

```js
// Multiple sources!
var target = { a: true };
var source1 = { b: true };
var source2 = { c: true };
var sourceN = { n: true };

var expected = {
	a: true,
	b: true,
	c: true,
	n: true
};

var assign = require('object.assign');
var assert = require('assert');

[source1, source2, sourceN].reduce(Object.assign, target);
assert.deepEqual(target, expected); // AWESOME!
```

```js
var assign = require('object.assign');
var assert = require('assert');
var target = {
	a: true,
	b: true,
	c: true
};
var source = {
	c: false,
	d: false,
	e: false
};

var assigned = assign(target, source);
assert.equal(target, assigned); // returns the target object
assert.deepEqual(assigned, {
	a: true,
	b: true,
	c: false,
	d: false,
	e: false
});
```

```js
var assign = require('object.assign');
var assert = require('assert');
/* when Object.assign is not present */
delete Object.assign;
var shimmedAssign = assign.shim();
assert.equal(shimmedAssign, assign);

var target = {
    a: true,
    b: true,
    c: true
};
var source = {
    c: false,
    d: false,
    e: false
};

var assigned = assign(target, source);
assert.deepEqual(Object.assign(target, source), assign(target, source));
```

```js
var assign = require('object.assign');
var assert = require('assert');
/* when Object.assign is present */
var shimmedAssign = assign.shim();
assert.equal(shimmedAssign, Object.assign);

var target = {
    a: true,
    b: true,
    c: true
};
var source = {
    c: false,
    d: false,
    e: false
};

assert.deepEqual(Object.assign(target, source), assign(target, source));
```

## Source
Implementation taken directly from [es6-shim]([11]) and modified locally.

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/object.assign
[2]: http://vb.teelaun.ch/ljharb/object.assign.svg
[3]: https://travis-ci.org/ljharb/object.assign.png
[4]: https://travis-ci.org/ljharb/object.assign
[5]: https://david-dm.org/ljharb/object.assign.png
[6]: https://david-dm.org/ljharb/object.assign
[7]: https://david-dm.org/ljharb/object.assign/dev-status.png
[8]: https://david-dm.org/ljharb/object.assign#info=devDependencies
[9]: https://ci.testling.com/ljharb/object.assign.png
[10]: https://ci.testling.com/ljharb/object.assign
[11]: https://github.com/es-shims/es5-shim/blob/master/es5-shim.js#L542-589
[12]: https://nodei.co/npm/object.assign.png?downloads=true&stars=true

