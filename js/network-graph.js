var person = "Benjamin Timmermans";

var color = d3.scale.linear()
    .domain([-0.5, 0, 0.5])
    .range(["#fc8d59", "#ffffbf", "#91bfdb"]);

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
				links.push({source: nodes[friends[i][0]], target: nodes[friends[i][2][j]], type: 'line'});
			}
			processedFriends[friends[i][2][j]+""+friends[i][0]] = true;
		}
	}
	
	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.size([width, height])
		.linkDistance( 50 )
		.charge(-50)
		.on("tick", tick)
		.start();

	var link = svg.selectAll(".link")
		.data(force.links())
		.enter().append("line")
		.attr("class", function(d) { return "line"; } )
		.attr("id", function(d) { if(d.source.name == person) { return d.target.name; } });

	var node = svg.selectAll(".node")
		.data(force.nodes())
		.enter().append("g")
		.attr("class", "node")
		.attr("id", function(d) { return d.name } )
		.on("click", filter)
		.call(force.drag);

	node.append("circle")
		.attr("r", function(d) { 
			return 5; })
		.style("stroke", function(d, i) { return color(0); })
		.attr("class", function(d) { return d.type });

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

	function filter() {
	  if(d3.select(this).select("circle").attr("class") == "normal") {
		d3.select(this).select("circle").transition()
			.attr("class", "ignored")
			.attr("r", 4);
	  }
	  else if (d3.select(this).select("circle").attr("class") == "ignored") {
		d3.select(this).select("circle").transition()
			.attr("class", "normal")
			.attr("r", 5);
	  
	  }
	  
	  //d3.select(".line").select(this.id).transition()
		  //.attr("class", "ignored");
	}
}

function updateNetwork(friendScores) {
	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.size([width, height])
		.linkDistance( 40 )
		.charge(-50)
		.on("tick", tick)
		.start();

	var node = svg.selectAll(".node")
		.data(force.nodes());
	
	node.select("circle").transition()
		.duration(1000)
		.attr("r", function(d) { 
			return 5 - friendScores[d.id] * 5; })
		.style("stroke", function(d, i) { return color(-friendScores[d.id]); });

	var link = svg.selectAll(".link")
		.data(force.links());

	function tick() {
	  link
		  .attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; })
	  node
		  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}
	
	function filter() {
	  if(d3.select(this).select("circle").attr("class") == "normal") {
		d3.select(this).select("circle").transition()
			.attr("class", "ignored")
			.attr("r", 4);
	  }
	  else if (d3.select(this).select("circle").attr("class") == "ignored") {
		d3.select(this).select("circle").transition()
			.attr("class", "normal")
			.attr("r", 5);
	  
	  }
	  
	  //d3.select(".line").select(this.id).transition()
		  //.attr("class", "ignored");
	}
}