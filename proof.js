

var
	read = require('fs').readFileSync,
	recast = require('recast');

var
	name = process.argv[2] || 'test.js',
	code = read(name, 'utf-8');

var
	ast = recast.parse(code);

recast.visit(ast,
{
	visitIfStatement: function (path)
	{
		console.log(path);

		path.value.alternate = null;
		this.traverse(path);
	},
});

code = recast.print(ast).code;

process.stdout.write(code);
