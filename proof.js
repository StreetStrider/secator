

var
	read = require('fs').readFileSync;

var
	name = process.argv[2] || 'test.js',
	code = read(name, 'utf-8');

var
	secator = require('./secator');

code = secator(code);

process.stdout.write(code);
