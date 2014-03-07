var fill = d3.scale.category20();

var width = $('#wordcloud').width(),
	height = $('#wordcloud').height();
	
var wordsArray = [];
var weightsArray = [];
var wordObjects = [];

var svgbody = d3.select("#wordcloud")//create this 'shortcut-variable', so I don't have to type this code over and over again
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class","wordcloud")

//I assume every word gets a weight between 0 an 1 here.
var input = [["cat",0.9], ["dog",0.3], ["puppy",0.6], ["Rens",0.2], ["Arjen",0.2], ["Benjamin",0.2], ["Harriëtte",0.2],["Sander",0.2],
	["Philip",0.2], ["javascript",0.1], ["word",0.1], ["cloud",0.7], ["awesome",0.8], ["will",0.3], ["you",0.2],["like",0.9],
	["me",0.2], ["project",0.1], ["information",0.2], ["visualization",0.5], ["New Media",0.5], ["Human Centered Multimedia",0.1], 
	["Facebook",0.5],["Likes",0.5],	["dislike",0.3], ["hobbies",0.1], ["AI",0.5], ["user interface",0.2], ["design",0.3], ["network",0.1],
	["graph",0.1],["photo",0.1], ["video",0.1], ["text",0.5], ["audio",0.1],["Justin Bieber",0.001]];				

//the main function to visualize the word cloud, given certain input
			
for(var i in input){wordsArray[i]= input[i][0]};
for(var i in input){weightsArray[i]= input[i][1]};

d3.layout.cloud().size([width, height])
	.words(wordsArray 
	.map(function(d,i) {
		//determine the size of a word here (I've created a formula that is based on the width height and array length. it seems to work for now)
		return {text: d, size: weightsArray[i]*(100+(width+height)/input.length)};
	}))
	
	//determine the angle of a word here (change 90 into 0 to not rotate any words)
	.rotate(0)
	.font("Impact")
	.fontSize(function(d) { return d.size; })
	.on("end", function(k){
		//svgbody.selectAll("text").data([]).exit().remove();//remove the words (if any words are there)
		wordObjects = k;
		
		svgbody
		.append("g")
			.attr("transform", "translate("+width/2+","+height/2+")")//group words in the centre of the cloud
		.selectAll("text")
			.data(k)
		.enter().append("text")
			.transition()
			.duration(1000)
			.delay(function(d,i) {
				return i * 50;
			})
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })//determine word color here
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.text; });
		
	})
	.start();


d3.select("#wordcloud")
	.on("click", function(k) {
	
		var input = [["cat",0.9], ["dog",0.3], ["puppy",0.6], ["Rens",0.2], ["Arjen",0.2], ["Benjamin",0.2], ["Harriëtte",0.2],["Sander",0.2],
		["Philip",0.2], ["javascript",0.1], ["word",0.1], ["cloud",0.7], ["awesome",0.8], ["will",0.3], ["you",0.2],["like",0.9],
		["me",0.2], ["project",0.1], ["information",0.2], ["visualization",0.5], ["New Media",0.5], ["Human Centered Multimedia",0.1], 
		["Facebook",0.5],["Likes",0.5],	["dislike",0.3], ["hobbies",0.1], ["AI",0.5], ["user interface",0.2], ["design",0.3], ["network",0.1],
		["graph",0.1],["photo",0.1], ["video",0.1], ["text",0.5], ["audio",0.1],["Justin Bieber",0.001]];
		
		
		for(var i in input){wordsArray[i]= input[i][0]};
		for(var i in input){weightsArray[i]= input[i][1]};
	
		d3.layout.cloud().size([width, height])
			.words(wordsArray 
			.map(function(d,i) {
				//determine the size of a word here (I've created a formula that is based on the width height and array length. it seems to work for now)
				return {text: d, size: weightsArray[i]*(100+(width+height)/input.length)};
			}))
			
			//determine the angle of a word here (change 90 into 0 to not rotate any words)
			.rotate(0)
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", function(k){

				var cloud = svgbody.selectAll("text")
					.data(k);
				
				cloud.enter()
					.append("g")
					.attr("transform", "translate("+width/2+","+height/2+")");//group words in the centre of the cloud
					
				cloud.data(k)
					.transition()
					.duration(1000)
					.style("font-size", function(d) { return d.size + "px"; })
					.style("font-family", "Impact")
					.style("fill", function(d, i) { return fill(i); })//determine word color here
					.attr("text-anchor", "middle")
					.attr("transform", function(d) {
						return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					})
					.text(function(d) { return d.text; });
					
				cloud.exit().remove();			
			})
			.start();					
	});