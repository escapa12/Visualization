(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['d3-line-chart'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('d3'));
	} else {
		root.LineChart = factory(root.d3);
	}
}(this, function(d3) {
	function LineChart(opts) {
		opts = opts || {};
		var lc = {
			id: opts.id,
			parent: opts.parent || 'body',
			class: 'd3-line-chart',
			all_series: opts.all_series,
			graph_width: opts.graph_width || 1050,
			graph_height: opts.graph_height || 285,
			margin: opts.margin || {top: 20, right: 150, bottom: 30, left: 60},
			x_axis_text: opts.x_axis_text || 'x-axis',
			y_axis_text: opts.y_axis_text || 'y-axis',
			x_parse: opts.x_parse || function(d) { return d; },
			y_parse: opts.y_parse || function(d) { return d; },
			x_scale: opts.x_scale || d3.scale.linear(),
			y_scale: opts.y_scale || d3.scale.linear(),
			tooltip: opts.tooltip || function(div, point) {
				div.select(".title").text(lc.x_axis_text + ': ' + point.x);
				div.select(".desc").text(point.y);
			}
		};

		lc.width = lc.graph_width - lc.margin.left - lc.margin.right;
		lc.height = lc.graph_height - lc.margin.top - lc.margin.bottom;
		lc.x_scale.range([0, lc.width]);
		lc.y_scale.range([lc.height, 0]);

		lc.at = function(id) {
			lc.parent = id || 'body';
		}

		lc.parse_using = function(x_parse, y_parse) {
			lc.x_parse = x_parse || lc.x_parse;
			lc.y_parse = y_parse || lc.y_parse;
			return lc;
		}

		lc.scale_using = function(x_scale, y_scale) {
			lc.x_scale = x_scale || lc.x_scale;
			lc.y_scale = y_scale || lc.y_scale;
			lc.x_scale.range([0, lc.width]);
			lc.y_scale.range([lc.height, 0]);
		}

		lc.for = function(data) {
			lc.all_series = data;
			return lc;
		}

		lc.addSeries = function(series) {
			lc.all_series.push(series);
			return lc;
		}

		function calculate_domain(lc) {
			lc.x_scale.domain([
				d3.min(lc.all_series, function(s) { return d3.min(s.values, function(c) { return c.x }); }),
				d3.max(lc.all_series, function(s) { return d3.max(s.values, function(c) { return c.x }); })
				]);
			lc.y_scale.domain([
				d3.min(lc.all_series, function(s) { return d3.min(s.values, function(c) { return c.y }); }),
				d3.max(lc.all_series, function(s) { return d3.max(s.values, function(c) { return c.y }); })
				]);
		}

		function parse_all_data_points(lc) {
			lc.all_series.forEach(function (data) {
				data.values.forEach(function(d) {
					d.x = lc.x_parse(d.x);
					d.y = lc.y_parse(d.y);
				});
			});
		}

		function plot_axis(lc) {
			var xAxis = d3.svg.axis().scale(lc.x_scale).orient("bottom").tickFormat(d3.format("d"));
			var yAxis = d3.svg.axis().scale(lc.y_scale).orient("left");

			lc.graph.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + lc.height + ")")
			.call(xAxis)
			.append("text")
			.attr("x", lc.width)
			.attr("y", -10)
			.style("text-anchor", "end")
			.text(lc.x_axis_text);

			lc.graph.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(lc.y_axis_text);


		}

		function build_svg() {
			var svg = d3.select(lc.parent).append("svg")
			.attr("id", lc.id)
			.attr("width", lc.graph_width)
			.attr("height", lc.graph_height)
			.append("g")
			.attr("transform", "translate(" + lc.margin.left + "," + lc.margin.top + ")");
			lc.graph = svg;
		}

		function set_color(lc) {
			var color = d3.scale.category10();
			color.domain(lc.all_series.map(function(d) { return d.name }));
			lc.color = color;
		}

		function plot_legend(series, index) {
			var legend = lc.graph.append("g");

			legend.append("text")
			.attr("class", "legend-text-" + index)
			.text(series.name)
			.attr("x", lc.width + 15)
			.attr("y", 4 + index*20);

			legend.append("circle")
			.attr("class", "legend-circle")
			.attr("cx", lc.width)
			.attr("cy", index*20)
			.attr("r", 8)
			.style("stroke", d3.rgb(lc.color(index)).brighter())
			.style("fill", lc.color(index))
			.on("mouseenter", function(d) {
				d3.select(this).classed('selected', true);
				var all_points = d3.selectAll('.commit-circle.' + series.name.replace(/\W/g,'.'));
				all_points.forEach(function(p) {
					d3.selectAll(p).classed('selected', true);
				});
			})
			.on("mouseleave", function(d) {
				d3.select(this).classed('selected', false);
				var all_points = d3.selectAll('.commit-circle.' + series.name.replace(/\W/g,'.'));
				all_points.forEach(function(p) {
					d3.selectAll(p).classed('selected', false);
				});
			});
		}

		function plot_line(series, index) {
			var line = d3.svg.line()
			.x(function(d) { return lc.x_scale(d.x); })
			.y(function(d) { return lc.y_scale(d.y); });

			lc.graph.append("path")
			.attr("class", "line")
			.attr("d", line(series.values))
			.style("stroke", lc.color(index));
		}

		function plot_points(series, index) {
			var data = series.values;
			lc.graph.selectAll(".commit-circle-" + index).data(data)
			.enter().append("g")
			.append("circle")
			.attr("class", 'commit-circle')
			.classed(series.name, true)
			.attr("cx", function(d) { return lc.x_scale(d.x); })
			.attr("r", 1)
			.attr("cy", function(d) { return lc.y_scale(d.y); })
			.style("stroke", d3.rgb(lc.color(index)).brighter())
			.style("fill", lc.color(index))
			.on("mouseenter", function(d) {
				d3.select(this).classed('selected', true);
				var xPosition = d3.event.pageX + 10;
				var yPosition = d3.event.pageY;
				var tooltip = d3.select("#tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px");
				lc.tooltip(tooltip, d);
				tooltip.classed("hidden", false);
			})
			.on("mouseleave", function() {
				d3.select(this).classed('selected', false);
				d3.select("#tooltip").classed("hidden", true);
			});

		}

		function mouse(series,index) {
			var data = series.values;
			var mouseG = lc.graph.append("g")
	      .attr("class", "mouse-over-effects");

	    mouseG.append("path") // this is the black vertical line to follow mouse
	      .attr("class", "mouse-line")
	      .style("stroke", "black")
	      .style("stroke-width", "1px")
	      .style("opacity", "0");
	      
	    var lines = document.getElementsByClassName('line');

	    var mousePerLine = mouseG.selectAll('.mouse-per-line')
	      .data(data)
	      .enter()
	      .append("g")
	      .attr("class", "mouse-per-line");

	    mousePerLine.append("circle")
	      .attr("r", 7)
	      .style("stroke",d3.rgb(lc.color(index)).brighter())
	      .style("fill", "none")
	      .style("stroke-width", "1px")
	      .style("opacity", "0");

	    mousePerLine.append("text")
	      .attr("transform", "translate(10,3)");

	    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
	      .attr('width', lc.width) // can't catch mouse events on a g element
	      .attr('height', lc.height)
	      .attr('fill', 'none')
	      .attr('pointer-events', 'all')
	      .on('mouseout', function() { // on mouse out hide line, circles and text
	        d3.select(".mouse-line")
	          .style("opacity", "0");
	        d3.selectAll(".mouse-per-line circle")
	          .style("opacity", "0");
	        d3.selectAll(".mouse-per-line text")
	          .style("opacity", "0");
	      })
	      .on('mouseover', function() { // on mouse in show line, circles and text
	        d3.select(".mouse-line")
	          .style("opacity", "1");
	        d3.selectAll(".mouse-per-line circle")
	          .style("opacity", "1");
	        d3.selectAll(".mouse-per-line text")
	          .style("opacity", "1");
	      })
	      .on('mousemove', function() { // mouse moving over canvas
	        var mouse = d3.mouse(this);
	        d3.select(".mouse-line")
	          .attr("d", function() {
	            var d = "M" + mouse[0] + "," + lc.height;
	            d += " " + mouse[0] + "," + 0;
	            return d;
	          });

	          var x = d3.scale.linear()
			      .range([0, lc.width]);

			    var y = d3.scale.linear()
			      .range([lc.height, 0]);

	        d3.selectAll(".mouse-per-line")
	          .attr("transform", function(d, i) {
	            var xDate = x.invert(mouse[0]);
	                bisect = d3.bisector(function(d) { return d.x; }).right;
	                idx = bisect(d.x, xDate);
	                
	            var beginning = 0,
	                end = lines[i].getTotalLength(),
	                target = null;

	            while (true){
	              target = Math.floor((beginning + end) / 2);
	              pos = lines[i].getPointAtLength(target);
	              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
	                  break;
	              }
	              if (pos.x > mouse[0])      end = target;
	              else if (pos.x < mouse[0]) beginning = target;
	              else break; //position found
	            }
	            
	            d3.select(this).select('text')
	              .text(y.invert(pos.y).toFixed(2));
	              
	            return "translate(" + mouse[0] + "," + pos.y +")";
	          });
	      });
		}

		lc.plot = function() {
			build_svg(lc);
			parse_all_data_points(lc);
			calculate_domain(lc);
			set_color(lc);
			plot_axis(lc);
			lc.all_series.forEach(function(val, index, array) {
				plot_legend(val, index);
				plot_line(val, index);
				plot_points(val, index);
				mouse(val,index);
			});
		}

		return lc;
	}
	return LineChart;
}));
