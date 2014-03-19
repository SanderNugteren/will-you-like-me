function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

function match(message, data) {
	// split message into terms
	var terms = message.match(/\s|\.|,|\/|#|!|$|%|\^|&|\*|;|:|{|}|\=|\-|_|`|~|\(|\)|@|\+|\?|>|<|\[|\]|\+|[a-zA-Z0-9]+/g);
	
	// set variables
	var likes = 0;
	var termCount = 0;
	var matchingTerms = [];
	var nonMatchingTerms = deepCopy(data);
	var termScores = [0];
	
	// push friend names into friendScores
	var friendScores = [];
	for(i = 1; i < data.length; i++)
	{
		friendScores[data[i][0]] = [];
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
				nonMatchingTerms[0].splice(i,1);
				for(k = 1; k < data.length; k++) {
					friendScores[data[k][0]].push(data[k][i]);
					nonMatchingTerms[k].splice(i,1);
				}
			}
		}
	}
	
	// calculate scores for friends and total likes
	if(termCount > 0) {
		for(i in friendScores) {
			var like = 0;
			for(j in friendScores[i]) {
				like += friendScores[i][j];
			}
			likes += (like / friendScores[i].length);
			friendScores[i] = 1 - (like / friendScores[i].length);
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