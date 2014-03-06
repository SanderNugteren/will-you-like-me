
var dataset = [];
var fill = d3.scale.category20();
var terms = ["time","person","year","way","day","thing","man","world","life","hand","part","child"]
for(i = 0; i < 10;i++) {
	dataset[i] = Math.floor((Math.random()*100)+1);
}

console.dir(dataset);

	// default year
	sub = 2010;
	
	var w = 450;
	var h = 200;
	var padding = 20;
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var barPadding = w / dataset.length / 12;
	
	var barchart = d3.select("#barchart")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var yScale = d3.scale.linear()
		.domain([0, dataset.length])
		.range([padding, h - padding * 2]);
		
	var xScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { return d; })])
		.range([padding, w - padding * 2]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(5);
	
	barchart.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.sort(function(a, b) {
			return d3.descending(a, b);
		})
		.attr("y", function(d, i) {
			return yScale(i) + barPadding;
		})
		.attr("x", function(d) {
			return padding * 2;
		})
		.attr("height", h / dataset.length - barPadding * 2)
		.attr("width", function(d) {
			return xScale(d) - padding;
		})
		.style("fill", function(d, i) { return fill(i); });
		
	barchart.selectAll("text.value")
		.data(dataset)
		.enter()
		.append("text")
		.sort(function(a, b) {
			return d3.descending(a, b);
		})
		.attr("class", "value")
		.text(function(d) {
			return d;
		})
		.attr("text-anchor", "middle")
		.attr("y", function(d, i) { 
			return yScale(i) + (h / dataset.length) / 2;
		})
		.attr("x", function(d) {
			return xScale(d) + padding + 10;
		})
		.attr("font-family", "Courier")
		.attr("font-size", "12px");
		
	barchart.selectAll("text.name")
		.data(dataset)
		.enter()
		.append("text")
		.sort(function(a, b) {
			return d3.descending(a, b);
		})
		.attr("class", "name")
		.text(function(d, i) {
			return terms[i];
		})
		.attr("text-anchor", "middle")
		.attr("y", function(d, i) { 
			return yScale(i) + (h / dataset.length) / 2;
		})
		.attr("x", function(d) {
			return 20;
		})
		.attr("font-family", "Courier")
		.attr("font-size", "14px");
		
	barchart.append("text")
		.attr("class", "year")
		.text(function() {
			return dataset.length;
		})
		.attr("text-anchor", "middle")
		.attr("x", w - 110)
		.attr("y", h - 50)
		.attr("font-family", "Arial")
		.attr("font-size", "40px");
	
	barchart.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(20," + (h - padding) + ")")
		.call(xAxis);
		
	// update on keypress
	d3.select("#barchart")
		.on("click", function(k) {
			// update if year exists

			var dataset = [];
			var terms = ["time","person","year","way","day","thing","man","world","life","hand","part","child"]
			for(i = 0; i < Math.floor((Math.random()*8)+4);i++) {
				dataset[i] = Math.floor((Math.random()*100)+1);
			}
			
			var barPadding = w / dataset.length / 12;
	
			xScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return d; })])
				.range([padding, w - padding * 2]);

			yScale = d3.scale.linear()
				.domain([0, dataset.length])
				.range([padding, h - padding * 2]);
				
			xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(5);
			
			var sortItems = function (a, b) {
				return b.value - a.value;
			};
			
			var rects = barchart.selectAll("rect")
				.data(dataset);
			
			// bars
			rects.enter().append("rect")
				.style("fill", function(d, i) { return fill(i); })
				.attr("width", 0);
			
			rects.data(dataset)
				.sort(function(a, b) {
					return d3.descending(a, b);
				})
				.transition()
				.duration(1000)
				.attr("x", function(d, i) {
					return padding * 2;
				})
				.attr("width", function(d) {
					return xScale(d) - padding;
				})
				.attr("y", function(d, i) {
					return yScale(i) + barPadding;
				})
				.attr("height", h / dataset.length - barPadding * 2)
				.attr("fill", "orange");
			
			rects.exit()
				.transition()
				.duration(1000)
				.attr("width", 0)							
				.remove();

			// values
			var values = barchart.selectAll("text.value")
				.data(dataset);
				
			values.enter().append("text")
				.attr("class", "value")
				.attr("x", 10);

			values.data(dataset)
				.sort(function(a, b) {
					return d3.descending(a, b);
				})
				.transition()
				.duration(1000)
				.text(function(d) {
					return d;
				})
				.attr("x", function(d) {
					return xScale(d) + padding + 10;
				})
				.attr("y", function(d, i) { 
					return yScale(i) + (h / dataset.length) / 2;
				});
				
			values.exit()
				.remove();

			// names
			var names = barchart.selectAll("text.name")
				.data(dataset);
				
			names.enter().append("text")
				.attr("class", "name")
				.attr("x", -10)
				.text(function(d, i) {
					return terms[i];
				});

			names.data(dataset)
				.sort(function(a, b) {
					return d3.descending(a, b);
				})
				.transition()
				.duration(1000)
				.attr("text-anchor", "middle")
				.attr("y", function(d, i) { 
					return yScale(i) + (h / dataset.length) / 2;
				})
				.attr("x", function(d) {
					return 20;
							})
							.attr("font-family", "Courier")
							.attr("font-size", "14px");

							
						names.exit()
							.remove();
							

							
						barchart.select("text.year")
							.text(function() {
								return dataset.length;
							});

						barchart.select("g")
							.data(dataset)
							.transition()
							.duration(1000)
							.attr("transform", "translate(20," + (h - 20) + ")")
							.call(xAxis);
					});