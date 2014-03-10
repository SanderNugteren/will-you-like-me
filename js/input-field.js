var time = 0;
var likes = 0;
var dataset = [];

var fill = d3.scale.category20();

		// get prediction data
		var data = testData();

// act on input change
$('#message').bind('input propertychange', function() {

	var message = this;
	
	// force second timeout
	clearTimeout(time);
	time = setTimeout(function() {

		// split message into terms
		var terms = message.value.split(" ");
		
		// get sum of prediction data for each term
		var termScores = [0];
		for(i = 1; i < data[0].length; i++)
		{
			var score = 0;
			for(j = 1; j < data.length; j++) {
				score += data[j][i];
			}
			termScores.push(Math.round(score*100)/100);
		}
		
		// get data not matching terms
		var nonMatchingTerms = [];
		for(j = 1; j < data[0].length; j++) {
			var match = false;
			for(i in terms)
			{
				if(terms[i] == data[0][j]) {
					match == true;
				}
			}
			if(match == false) {
				nonMatchingTerms.push([data[0][j],termScores[j]]);
			}
		}
		
		// get terms matching data
		var termCount = 0;
		var matchingTerms = [];
		for(i in terms) {
			for(j = 1; j < data[0].length; j++)
			{
				if(terms[i] == data[0][j]) {
					matchingTerms.push([terms[i],termScores[j],termCount]);
					terms[i] = "<span style='background: " + fill(termCount) + "'>" + terms[i] + "</span>";
					termCount++;
				}
			}
		}

		$('.highlighter').html(terms.join(" "));

		// act if terms changed
		if(matchingTerms.toString() != dataset.toString()) {
			jQuery({animlikes: likes}).animate({animlikes: termCount * 11}, {
				duration: 1000,
				easing:'swing', // can be anything
				step: function() { // called on every step
				// Update the element's text with rounded-up value:
					$('#likes').text(Math.floor(this.animlikes) + " friends");
				}
			});

			dataset = matchingTerms.slice(0);
			likes = termCount * 11;

			// Update other graphs
			updateBarchart(matchingTerms);
			//updateNetwork();
			updateWordcloud(nonMatchingTerms);
		}
	}, 200);
});