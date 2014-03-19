/*

Example:

var testData = [
[			,	"cat",	"dog",	"puppy",	"word",	"cloud",	"awesome",	"will",	"you",	"like",	"me",	"project",	"information",	"visualization",	"New Media",	etc..],
["Benjamin",	0.1,	0.5,	0.3,		0.4,	0.9,		0.4,		0.2,	0.3,	0.2,	0.1,	0.5,		0.8,			0.2,				0.21,			etc..],
["Rens",		0.5,	0.1,	0.7,		0.2,	0.9,		0.5,		0.6,	0.2,	0.1,	0.1,	0.5,		0.8,			0.2,				0.21,			etc..],
["Sander",		0.3,	0.3,	0.5,		0.1,	0.4,		0.4,		0.2,	0.3,	0.27,	0.7,	0.4,		0.7,			0.5,				0.53,			etc..],
["Philip",		0.7,	0.4,	0.5,		0.5,	0.9,		0.3,		0.3,	0.3,	0.24,	0.3,	0.5,		0.8,			0.6,				0.1,			etc..]];


*/
var testResults = [0,0.25501539664464601, -0.17350210158804047, -1.4486663103285022, 0.050112051487942788, -1.0221047023012508, 1.4322690543684293, -0.70910172342881239, -2.9784935052563446, -3.6792530684584852, 1.9517110867805947, -1.9406661843064976, 0.25250281654833917, -2.5095673175888416, -2.9411392758442823, -4.8127667327904682, -0.93831733910265558, -0.48882213483689441, -2.2420849107817, -0.17961163832519977, 4.4538331750964142, -1.5504642680191214, -4.4416132428460831, -0.96143511142921256, -2.3705996080185594, 8.8755659848022272, -2.041824936880285, 7.0362674930440061, -0.076369048535275708, -3.0974081163517924, -0.25047552517951643, -0.015776747078231856, -0.022251709024233013, 0.018195964353384275, 0.51535745883718453, -0.51130171416640846, -0.56417989018275272, -0.95607749353162075];
function testData() {
	var testData = [];
	testData.push([0,'for', 'on', 'i', 'me', 'my', 'it', 'jan', 'video', 'and', 'we', 'een', 'new', 'ik', 'van', 'sjo', 'now', 'voor', 'have', 'just', 'like', 'but', 'die', 'what', 'nog', 'arjen', 'are', 'het', 'facebook', 'wie', 'wil', 'post length', 'posted at_night', 'posted in_morning', 'posted in_afternoon', 'posted in_evening', 'post has_link', 'post has_photo']);

	for(f = 0; f < friends.length; f++)
	{
		var friendData = [parseInt(friends[f][0])];
		for(i = 1; i < testData[0].length; i++)
		{
			// more variance in test data
			var random = Math.random();
			if(random > 0.65) {
				friendData.push(Math.round(Math.random()*50+50)/100);
			} else {
				friendData.push(Math.round(Math.random()*50)/100);
			}
		}
		testData.push(friendData);
	}
	return testData;
}