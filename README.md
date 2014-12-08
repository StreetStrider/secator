# secator
**secator** for JavaScript debug branches of code. Instead of having debug code and configuration variable which controls it — just remove all debug entries in production.

Consider the following code:
```javascript
function debug () {
	// control this parameter in development
	// to run `debug` or `release` branches
	// or any other features
	return true;
}

if (debug()) {
	console.log('some debug code');
	console.log('debug_run', +new Date);
} else {
	app.feedback.log('some debug code');
}
```

Then run `secator file.js`. The `if` statement would be replaced with the only `else`-statement contents (if present).
```javascript
app.feedback.log('some debug code');
```

secator only works with `debug()` function and only in positive form (`!debug()` would not be transformed), which can be used to prevent false positive transformations.

This is a fun experiment comparing two different aproaches: feature-gates vs code transforming. The second one creates lower code footprint, but requires preprocessing of all files involved. It can be used as transformation step before minification and other build steps.
