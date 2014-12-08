

var
	read = require('fs').readFileSync,
	recast = require('recast');

var
	name = process.argv[2] || 'test.js',
	code = read(name, 'utf-8');

console.log(code);
