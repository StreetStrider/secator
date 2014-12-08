


var
	recast = require('recast'),
	types  = recast.types,
	N = types.namedTypes,
	B = types.builders;

module.exports = function secator (code)
{
	var
		ast = recast.parse(code);

	recast.visit(ast,
	{
		visitIfStatement: function (path)
		{
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

	return code;
}

function isDebug (astIf)
{
	var test = astIf.test;

	return (
		N.CallExpression.check(test)
		&&
		test.callee.name === 'debug'
	);
}
