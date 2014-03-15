// get prediction data
var data = testData();
dataset = match(" ", data);

function match(message, data) {
	// split message into terms
	var terms = message.match(/\s|\.|,|\/|#|!|$|%|\^|&|\*|;|:|{|}|\=|\-|_|`|~|\(|\)|@|\+|\?|>|<|\[|\]|\+|[a-zA-Z0-9]+/g);
	
	// set variables
	var likes = 0;
	var termCount = 0;
	var matchingTerms = [];
	var nonMatchingTerms = [];
	var termScores = [0];
	
	// push friend names into friendScores
	var friendScores = [];
	for(i = 1; i < data.length; i++)
	{
		friendScores[data[i][0]] = 0;
	}
	
	// match terms to data
	for(i = 1; i < data[0].length; i++)
	{
		//get sum of prediction data for each term
		var score = 0;
		for(j = 1; j < data.length; j++) {
			score += data[j][i];
		}
		termScores.push(Math.round(score*100)/100);

		// get terms matching data
		var match = false;
		for(j in terms)
		{
			if(terms[j].toLowerCase() == data[0][i].toLowerCase()) {
				match = true;
				matchingTerms.push([terms[j],termScores[i],parseInt(j)]);
				termCount++;
				
				// sum score for friend
				for(k = 1; k < data.length; k++) {
					friendScores[data[k][0]] = friendScores[data[k][0]] + data[k][i];
				}
			}
		}

		// get data non matching terms
		if(match == false) {
			nonMatchingTerms.push([data[0][i],termScores[i]]);
		}
	}
	
	// normalize friend scores
	if(termCount > 0) {
		for(i in friendScores) {
			friendScores[i] = Math.round(friendScores[i] / termCount * 100) / 100 - 0.5;
		}
	}
	
	matchingTerms.sort(function(a,b) {
		return a[2] == b[2] ? 0 : (a[2] < b[2] ? -1 : 1)
	})

	// get unique terms
	var j = 0;
	var uniqueTerms = [];
	for(i in matchingTerms) {
		if(!(matchingTerms[i][0] in uniqueTerms)) {
			uniqueTerms[matchingTerms[i][0]] = j;
			likes += matchingTerms[i][1];
			j++;
		}
	}
	
	// highlight same terms
	var matched = [];
	var remove = [];
	for(i in matchingTerms) {
		if(matchingTerms[i][0] in matched) {
			terms[matchingTerms[i][2]] = "<span style='background: " + fill(uniqueTerms[matchingTerms[i][0]]) + "'>" + matchingTerms[i][0] + "</span>";	
			remove.push(i);
		} else {
			terms[matchingTerms[i][2]] = "<span style='background: " + fill(uniqueTerms[matchingTerms[i][0]]) + "'>" + matchingTerms[i][0] + "</span>";
			matchingTerms[i][2] = uniqueTerms[matchingTerms[i][0]];
			matched[matchingTerms[i][0]] = true;
		}
	}
	
	// remove duplicate terms from barchart
	var j = 0;
	for(i in remove) {
		matchingTerms.splice(remove[i]-j, 1);
		j++;
	}

	return {terms: terms, likes: likes, matchingTerms: matchingTerms, nonMatchingTerms: nonMatchingTerms, termScores: termScores, friendScores: friendScores}
}