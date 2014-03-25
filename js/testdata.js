/*

Example:

var testData = [
[			,	"cat",	"awesome",	"will",	"you",	"like",	"me",	"project",	"information",	"visualization",	"New Media",	etc..],
["Benjamin",	0.1,	0.4,		0.2,	0.3,	0.2,	0.1,	0.5,		0.8,			0.2,				0.21,			etc..],
["Rens",		0.2,	0.5,		0.6,	0.2,	0.1,	0.1,	0.5,		0.8,			0.2,				0.21,			etc..],
["Sander",		0.3,	0.3,		0.2,	0.3,	0.27,	0.7,	0.4,		0.7,			0.5,				0.53,			etc..],
["Philip",		0.7,	0.4,		0.5,	0.5,	0.9,	0.3		0.8,		0.6,			0.1,				0.4				etc..]];


*/
var testResults = [-9249.7864087274174, -3961.2985318514375, 3440.7997244104868, -7886.0279557365702, -17255.322662335991, 4386.9553907703075, -9612.3737961777497, -3464.8331190425956, -6918.0648053756931, 649.02169754473107, 5744.1465199793593, -5049.4663942918196, -11543.227919204437, -2566.4855412426823, 44667.16437825669, 34.123833343101978, -14522.412489900504, 13887.860030028121, 3195.3109224942973, 9901.9624552693622, -5241.7731512468563, -6138.5205453527033, 184.87024896507592, -19138.39964052385, 3129.6519088491095, -3498.9852396857686, -606.04541556227377, -17797.823064540957, -22840.735538666049, 15955.749567361338, -282.95355413543984, 37827.508146609478, -2736.0324805062892, 17055.319307484104, 6617.6764899749505, 16483.888727117064, 6617.6764899749251, -20346.964077866265, -11669.206961256095, 2339.5779979560539, -180.18678463339177, 1312.4017201421429, -9585.0123020385399, 195.15996399757842, 8077.4506178988941, -10892.708726998069, 56703.696984649796];
function testData() {
	var testData = [];
	testData.push([0,'on', 'occupyboston', 'if', 'be', 'from', 'will', 'you', 'about', 'our', 'boston', 'need', 'please', 'i', 'or', 'your', 'support', 'occupy', 'as', 'it', 'can', 'help', 'out', 'have', 'new', 'are', 'we', 'never', 'just', 'down', 'an', 'us', 'all', 'follow', 'live', 'today', 'more', 'me', 'this', 'my', 'interview', 'post length', 'posted at_night', 'posted in_morning', 'posted in_afternoon', 'posted in_evening', 'post has_link', 'post has_photo']);

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

function likePrediction() {
	var moreData = [];
	moreData.push(['on', 'occupyboston', 'if', 'be', 'from', 'will', 'you', 'about', 'our', 'boston', 'need', 'please', 'i', 'or', 'your', 'support', 'occupy', 'as', 'it', 'can', 'help', 'out', 'have', 'new', 'are', 'we', 'never', 'just', 'down', 'an', 'us', 'all', 'follow', 'live', 'today', 'more', 'me', 'this', 'my', 'interview', 'post length', 'posted at_night', 'posted in_morning', 'posted in_afternoon', 'posted in_evening', 'post has_link', 'post has_photo'])
	moreData.push([  3.09146678e+00,   1.82404311e+00,   3.74179240e-01,
        -3.56294546e+00,   5.01072137e-01,  -6.37140072e+00,
        -2.19258980e+00,   4.30048717e-01,   6.48552892e-01,
         3.53761826e+00,   2.22959951e+00,   4.31933219e+00,
         3.61121053e+00,   1.80558324e+00,   1.20075717e+00,
         2.41554086e+00,  -8.66089984e+00,  -8.74368071e+00,
         7.73832002e-02,  -1.97408640e-02,  -9.44108319e-01,
         9.27316808e+00,  -4.74580317e+00,  -8.97630103e+00,
         4.68616000e+00,  -2.91043037e+00,   6.01653586e+00,
         3.08968806e+00,   7.85825624e+00,   5.24395780e+00,
         1.27556489e+00,  -5.23012168e-02,   2.41328105e+00,
         1.23802126e+01,   3.57218916e+00,   2.78907019e+00,
        -6.77768516e+00,  -1.23533011e+00,  -1.57002443e+00,
        -3.10709520e-01,   5.45221182e-03,  -2.17568680e-01,
         2.62936462e-01,   2.30779417e-01,  -2.76147199e-01,
         4.43357964e-02,   5.07190989e-02]);
	return moreData;
}
