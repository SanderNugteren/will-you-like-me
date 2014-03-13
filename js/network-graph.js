var person = "Benjamin Timmermans";
var links = [
  {source: "Benjamin", sourcetype: "like", target: "Rens", targettype: "like"},
  {source: "Rens", sourcetype: "like", target: "Sander", targettype: "like"},
  {source: "Rens", sourcetype: "like", target: "Philip", targettype: "nolike"},
  {source: "Sander", sourcetype: "like", target: "Benjamin", targettype: "like"},
];
		
var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, type: link.sourcetype});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, type: link.targettype});
  if(link.sourcetype == "like" && link.targettype == "like") {
	link.type = "like";
  } else {
	link.type = "foaf";
  }
});


var width = $('#network').width() - 20,
	height = $('#network').height() - 74;

var svg = d3.select("#network")
	.append("svg")
	.attr("width", width)
	.attr("height", height);	

function setNetwork() {
	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.size([width, height])
		.linkDistance( 100 )
		.charge(-150)
		.on("tick", tick)
		.start();

	var link = svg.selectAll(".link")
		.data(force.links())
		.enter().append("line")
		.attr("class", function(d) { return d.type; } )
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
			if(d.type == "nolike") { return 10; } else { return 6; } })
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
	  if(d3.select(this).select("circle").attr("class") == "ignored") {
		d3.select(this).select("circle").transition()
			.attr("class", "nolike")
			.attr("r", 10);
	  }
	  else if (d3.select(this).select("circle").attr("class") == "nolike") {
		d3.select(this).select("circle").transition()
			.attr("class", "ignored")
			.attr("r", 6);
	  
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
		.linkDistance( 100 )
		.charge(-150)
		.on("tick", tick)
		.start();

	var node = svg.selectAll(".node")
		.data(force.nodes());
	
	node.enter()
		.append("g")
		.attr("class", "node")
		.attr("id", function(d) { return d.name } )
		.on("click", filter)
		.call(force.drag);

	node.select("circle").transition()
		.duration(1000)
		.attr("r", function(d) { 
			return friendScores[d.name] * 20 + 5; })
		.attr("class", function(d) { return d.type });

	node.append("text")
		.attr("x", 14)
		.attr("dy", ".40em")
		.text(function(d) { return d.name; });

	
	
	function tick() {
	  node
		  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}
	
	function filter() {
	  if(d3.select(this).select("circle").attr("class") == "ignored") {
		d3.select(this).select("circle").transition()
			.attr("class", "nolike")
			.attr("r", 10);
	  }
	  else if (d3.select(this).select("circle").attr("class") == "nolike") {
		d3.select(this).select("circle").transition()
			.attr("class", "ignored")
			.attr("r", 6);
	  
	  }
	  
	  //d3.select(".line").select(this.id).transition()
		  //.attr("class", "ignored");
	}
}