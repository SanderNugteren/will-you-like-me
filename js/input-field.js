var likes = 0;
var colors = ['#F99','#9F9','#99F','#FF9','#9FF','#F9F','#FCC','#CFC','#CCF'];
$('#message').bind('input propertychange', function() {
	var hl = this.value.split(" ");
	var termCount = 0;
	var terms = [];
	var values = [];
	for(i = 0; i < hl.length; i++) {
		if(hl[i].length > 4) {
			terms.push(hl[i]);
			values.push(hl[i].length);
			hl[i] = "<span style='background: " + colors[termCount] + "'>" + hl[i] + "</span>";
			termCount++;
		}
	}
	
	$('.highlighter').html(hl.join(" "));
	
	if(likes != termCount * 11) {
		jQuery({animlikes: likes}).animate({animlikes: termCount * 11}, {
			duration: 1000,
			easing:'swing', // can be anything
			step: function() { // called on every step
			// Update the element's text with rounded-up value:
				$('#likes').text(Math.floor(this.animlikes) + " friends");
			}
		});
		likes = termCount * 11;
		
		// update barchart
		updateBarchart(terms, values);
	}
});