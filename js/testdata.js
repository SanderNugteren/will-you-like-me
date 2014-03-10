/*

Example:

var testData = [
[			,	"cat",	"dog",	"puppy",	"word",	"cloud",	"awesome",	"will",	"you",	"like",	"me",	"project",	"information",	"visualization",	"New Media",	etc..],
["Benjamin",	0.1,	0.5,	0.3,		0.4,	0.9,		0.4,		0.2,	0.3,	0.2,	0.1,	0.5,		0.8,			0.2,				0.21,			etc..],
["Rens",		0.5,	0.1,	0.7,		0.2,	0.9,		0.5,		0.6,	0.2,	0.1,	0.1,	0.5,		0.8,			0.2,				0.21,			etc..],
["Sander",		0.3,	0.3,	0.5,		0.1,	0.4,		0.4,		0.2,	0.3,	0.27,	0.7,	0.4,		0.7,			0.5,				0.53,			etc..],
["Philip",		0.7,	0.4,	0.5,		0.5,	0.9,		0.3,		0.3,	0.3,	0.24,	0.3,	0.5,		0.8,			0.6,				0.1,			etc..]];


*/

var friends = ["Philip","Benjamin","Rens","Harriette","Sander","Arjen"];

function testData() {
	var testData = [];
	testData.push([0,"cat","dog","puppy","word","cloud","awesome","will","you","like","me","project","information","visualization","New Media","Human Centered Multimedia","Facebook","Likes","dislike","hobbies","AI","user interface","design","network","graph","photo","video","text","audio","Justin Bieber"]);
	for(f = 0; f < friends.length; f++)
	{
		var friendData = [friends[f]];
		for(i = 1; i < testData[0].length; i++)
		{
			friendData.push(Math.round(Math.random()*100)/100);
		}
		testData.push(friendData);
	}
	return testData;
}