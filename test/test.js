


function debug ()
{
	return true;
}

if (debug())
{
	console.log('debug branch 1');
}
else
{
	console.log('release branch 1');
}

if (debug())
	console.log('debug branch 2');
else
	console.log('release branch 2');

if (!! debug())
{
	console.log('* debug branch 3')
}
else
{
	console.log('* release branch 3');
}

if (!! debug())
	console.log('* debug branch 4')
else
	console.log('* release branch 4');
