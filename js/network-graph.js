var person = "Benjamin Timmermans";
var links = [
  {source: "Stefan den Engelsman", sourcetype: "like", target: "Franc Timmermans", targettype: "nolike"},
  {source: "Patrick van der Weele", sourcetype: "like", target: "Marcel de Looff", targettype: "like"},
  {source: "Patrick van der Weele", sourcetype: "like", target: "Joost de Stigter", targettype: "like"},
  {source: "Marcel de Looff", sourcetype: "like", target: "Pieter Willemse", targettype: "like"},
  {source: "Marcel de Looff", sourcetype: "like", target: "Marissa Vallentin", targettype: "nolike"},
  {source: "Jasper Roose", sourcetype: "like", target: "Thomas Phil", targettype: "nolike"},
  {source: "Pieter Willemse", sourcetype: "like", target: "Jasper Roose", targettype: "like"},
  {source: "Thomas Phil", sourcetype: "nolike", target: "Lucas Tramper", targettype: "nolike"},
  {source: "Pieter Willemse", sourcetype: "like", target: "Patrick van der Weele", targettype: "like"},
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


var width = 450,
	height = 200;

var force = d3.layout.force()
	.nodes(d3.values(nodes))
	.links(links)
	.size([width, height])
	.linkDistance( 30 )
	.charge(-300)
	.on("tick", tick)
	.start();

var svg = d3.select("#network")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

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
		if(d.type == "nolike") { return 12; } else { return 8 } })
	.attr("class", function(d) { return d.type });

node.append("text")
	.attr("x", 20)
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
		.attr("r", 12);
  }
  else if (d3.select(this).select("circle").attr("class") == "nolike") {
	d3.select(this).select("circle").transition()
		.attr("class", "ignored")
		.attr("r", 8);
  
  }
  
  //d3.select(".line").select(this.id).transition()
	  //.attr("class", "ignored");
}