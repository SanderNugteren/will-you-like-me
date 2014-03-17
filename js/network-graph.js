var filteredFriends = [];

var color = d3.scale.linear()
    .domain([-0.5, 0, 0.5])
    .range(["#ffeda0", "#feb24c", "#f03b20"]);

var width = $('#network').width() - 20,
	height = $('#network').height() - 74;

var svg = d3.select("#network")
	.append("svg")
	.attr("width", width)
	.attr("height", height);	

var nodes = {};
var links = [];
	
function setNetwork() {
	// get all unique friend
	for(i in friends) {
		nodes[friends[i][0]] = {id: friends[i][0], name: friends[i][1], type: 'normal'};
	}
	
	var processedFriends = [];
	for(i in friends) {
		// get all relations
		for(j in friends[i][2]) {
			if(!(friends[i][0]+""+friends[i][2][j] in processedFriends)) {
				links.push({id: friends[i][0]+""+friends[i][2][j], source: nodes[friends[i][0]], target: nodes[friends[i][2][j]], type: 'line'});
			}
			processedFriends[friends[i][2][j]+""+friends[i][0]] = true;
		}
	}
	
	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(d3.values(links))
		.size([width, height])
		.linkDistance( 50 )
		.charge(-50)
		.on("tick", tick)
		.start();

	var link = svg.selectAll(".line")
		.data(force.links(), function(d) { return d.id; })
		.enter().append("line")
		.attr("class", function(d) { return "line"; } )
		.style("stroke", function(d, i) { return color(0); });

	var node = svg.selectAll(".node")
		.data(force.nodes())
		.enter().append("g")
		.attr("class", "node")
		.attr("id", function(d) { return d.name } )
		.on("click", function(d) {
			d3.select(this).select("circle").transition()
				.attr("class", 	function(d) {
					if(d.type == "normal") {
						return "ignored";
					} else {
						return "normal";
					}
				})
				.attr("r", function(d) {
					if(d.type == "normal") {
						return 4;
					} else {
						return 5;
					}
				})
				.style("stroke", function(d) {
					if(d.type == "normal") {
						d.type = "ignored";
						return "#DDD";
					} else {
						d.type = "normal";
						return color(0);
					}
				})
		})
		.call(force.drag);

	node.append("circle")
		.attr("r", function(d) { 
			return 5; })
		.attr("class", function(d) { return d.type })
		.style("stroke", function(d, i) { return color(0); });

	node.append("text")
		.attr("x", 14)
		.attr("dy", ".40em")
		.text(function(d) { return d.name; });


	function tick() {
	  link
		  .attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; })


	  node
		  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}
}

function updateNetwork(friendScores) {

	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(d3.values(links))
		.size([width, height])
		.linkDistance( 50 )
		.charge(-50)
		.on("tick", tick)
		.start();

	var node = svg.selectAll(".node")
		.data(force.nodes())
		.on("click", function(d) {
			// update wordcloud filter
			updateWordcloud(dataset.nonMatchingTerms);
			
			if(d.type == "normal") {
				filteredFriends[d.id] = true;	
				d3.select(this).select("circle").transition()
					.attr("class", 	function(d) { return "ignored"; })
					.attr("r", function(d) { return 4; })
					.style("stroke", function(d) { return color(-friendScores[d.id]); });
				d.type = "ignored";	
			} else {
				d3.select(this).select("circle").transition()
					.attr("class", 	function(d) { return "normal"; })
					.attr("r", function(d) { return 5 - friendScores[d.id] * 5; })
					.style("stroke", function(d) { return color(-friendScores[d.id]); });
				d.type = "normal";	
			}
		});
	
	node.select("circle").transition()
		.duration(1000)
		.attr("r", function(d) { 
			return 5 - friendScores[d.id] * 5; 
		})
		.style("stroke", function(d, i) { 
			if(d.type == "normal") {
				return color(-friendScores[d.id]);
			}
		});

	var link = svg.selectAll(".line")
		.data(force.links(), function(d) {
			return d.id;
		});
	
	link.transition()
		.attr("class", function(d) { return "line"; } )
		.style("stroke", function(d, i) { return color(-(friendScores[d.source.id]+friendScores[d.target.id])/2); });

		function tick() {
	  link
		  .attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; })


	  node
		  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}
}