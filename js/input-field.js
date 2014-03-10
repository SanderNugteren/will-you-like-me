var time = 0;
var dataset = [];
var prevlikes = 0;
var fill = d3.scale.category20();

		// get prediction data
		var data = testData();

// act on input change
$('#message').bind('input propertychange', function() {

	var message = this;
	var likes = 0;
	
	// force second timeout
	clearTimeout(time);
	time = setTimeout(function() {

		// split message into terms
		var terms = message.value.split(" ");

		// match terms to data
		var termScores = [0];
		var termCount = 0;
		var matchingTerms = [];
		var nonMatchingTerms = [];
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
				if(terms[j] == data[0][i]) {
					match = true;
					matchingTerms.push([terms[j],termScores[i],termCount]);
					terms[j] = "<span style='background: " + fill(termCount) + "'>" + terms[j] + "</span>";
					termCount++;
					likes += termScores[i];
				}
			}
			// get data non matching terms
			if(match == false) {
				nonMatchingTerms.push([data[0][i],termScores[i]]);
			}
		}


		$('.highlighter').html(terms.join(" "));

		// act if terms changed
		if(matchingTerms.toString() != dataset.toString()) {
			jQuery({animlikes: prevlikes}).animate({animlikes: likes}, {
				duration: 1000,
				easing:'swing', // can be anything
				step: function() { // called on every step
				// Update the element's text with rounded-up value:
					$('#likes').text(Math.floor(this.animlikes) + " friends");
				}
			});

			dataset = matchingTerms.slice(0);
			prevlikes = likes;

			// Update other graphs
			updateBarchart(matchingTerms);
			//updateNetwork();
			updateWordcloud(nonMatchingTerms);
		}
	}, 200);
});