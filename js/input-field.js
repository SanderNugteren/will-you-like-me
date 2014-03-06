var likes = 0;
var colors = ['#F99','#9F9','#99F','#FF9','#9FF','#F9F','#FCC','#CFC','#CCF'];
$('#message').bind('input propertychange', function() {
	var hl = this.value.split(" ");
	var c = 0;
	for(i = 0; i < hl.length; i++) {
		if(hl[i].length > 4) {
			hl[i] = "<span style='background: " + colors[c] + "'>" + hl[i] + "</span>";
			c++;
		}
	}
	$('.highlighter').html(hl.join(" "));
	
	if(likes != c * 11) {
		jQuery({animlikes: likes}).animate({animlikes: c * 11}, {
			duration: 1000,
			easing:'swing', // can be anything
			step: function() { // called on every step
			// Update the element's text with rounded-up value:
				$('#likes').text(Math.floor(this.animlikes) + " friends");
			}
		});
		likes = c * 11;
	}
});