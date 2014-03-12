function match(message, data) {
	// split message into terms
	var terms = message.match(/\s|\.|,|\/|#|!|$|%|\^|&|\*|;|:|{|}|\=|\-|_|`|~|\(|\)|@|\+|\?|>|<|\[|\]|\+|[a-zA-Z0-9]+/g);

	// set variables
	var likes = 0;
	var termCount = 0;
	var matchingTerms = [];
	var nonMatchingTerms = [];
	var termScores = [0];
	
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
				matchingTerms.push([terms[j],termScores[i],j]);
				termCount++;
				likes += termScores[i];
			}
		}
		// get data non matching terms
		if(match == false) {
			nonMatchingTerms.push([data[0][i],termScores[i]]);
		}
	}
	
	var j = 0;
	matchingTerms.sort(function(a,b) {
		return a[2] > b[2];
	})
	for(i in matchingTerms) {
		console.log(matchingTerms[i][2]);
		terms[matchingTerms[i][2]] = "<span style='background: " + fill(j) + "'>" + matchingTerms[i][0] + "</span>";
		matchingTerms[i][2] = j;
		j++;
	}
	
	return {terms: terms, likes: likes, matchingTerms: matchingTerms, nonMatchingTerms: nonMatchingTerms, termScores: termScores}
}