var time = 0;
var likes = 0;
var dataset = [];

var colors = ['#F99','#9F9','#99F','#FF9','#9FF','#F9F','#FCC','#CFC','#CCF'];
var fill = d3.scale.category20();
$('#message').bind('input propertychange', function() {

	// loop through message on change
	var highlight = this.value.split(" ");
	var termCount = 0;
	var newData = [];
	for(i = 0; i < highlight.length; i++) {
		if(highlight[i].length > 4) {
			newData.push([highlight[i],highlight[i].length, termCount]);
			highlight[i] = "<span style='background: " + fill(termCount) + "'>" + highlight[i] + "</span>";
			termCount++;
		}
	}
	
	$('.highlighter').html(highlight.join(" "));
	
		//newData.sort(function(a, b) { return (a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0)); });
		

	// force second timeout
	clearTimeout(time);
	time = setTimeout(function() {
		// act if terms changed
		if(newData.toString() != dataset.toString()) {
			jQuery({animlikes: likes}).animate({animlikes: termCount * 11}, {
				duration: 1000,
				easing:'swing', // can be anything
				step: function() { // called on every step
				// Update the element's text with rounded-up value:
					$('#likes').text(Math.floor(this.animlikes) + " friends");
				}
			});

			dataset = newData.slice(0);
			likes = termCount * 11;

			// Update other graphs
			updateBarchart(newData);
			//updateNetwork();
			updateWordcloud();
		}
	}, 200);
});