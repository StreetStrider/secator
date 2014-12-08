

var
	util = require('util'),
	read = require('fs').readFileSync;

var
	recast = require('recast'),
	types  = recast.types,
	N = types.namedTypes,
	B = types.builders;

var
	name = process.argv[2] || 'test.js',
	code = read(name, 'utf-8');

var
	ast = recast.parse(code);

recast.visit(ast,
{
	visitIfStatement: function (path)
	{
		//console.log(util.inspect(path.value.alternate, { depth: 3 }));

		if (isDebug(path.value))
		{
			var alternate = path.get('alternate').node;

			path.replace(alternate);

			if (N.BlockStatement.check(path.value))
			{
				var body = path.get('body').node;

				body = body.body[0]

				path.replace(body);
			}
		}

		this.traverse(path);
	},
});

code = recast.print(ast).code;

process.stdout.write(code);

function isDebug (astIf)
{
	var test = astIf.test;

	return (
		N.CallExpression.check(test)
		&&
		test.callee.name === 'debug'
	);
}
