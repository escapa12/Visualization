


var data = [];


<!-- Load my data -->
var dataset
function func_barchar(doc_profit){
d3.csv(doc_profit, function(data) {
  data.forEach(function(d) {
    d['2004'] = +d['2004']/1000000;
    d['2005'] = +d['2005']/1000000;
    d['2006'] = +d['2006']/1000000;
    d['2007'] = +d['2007']/1000000;
  });
  data.sort(function(x, y){
   return d3.descending(x['2006'], y['2006']);
})
var box = document.querySelector('div#grid-1-1');
var widthINI = box.offsetWidth;
var heightINI = 240

var margin =  {top: 20, right: 10, bottom: 20, left: 70};
var marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
var selectorHeight = 40;
var width = widthINI - margin.left - margin.right;
var height = heightINI - margin.top - margin.bottom - selectorHeight;
var heightOverview = 80 - marginOverview.top - marginOverview.bottom;

var maxLength = d3.max(data.map(function(d){ return d.Country.length}))
// var barWidth = maxLength * 7;
var barWidth = maxLength *5;

var numBars = Math.round(width/barWidth);
var isScrollDisplayed = barWidth * data.length > width;


console.log(isScrollDisplayed)


var xscale = d3.scale.ordinal()
                .domain(data.slice(0,numBars).map(function (d) { return d.Country; }))
                .rangeBands([0, width], .2);

var yscale = d3.scale.linear()
							.domain([0, d3.max(data, function (d) { return d['2006']; })])
              .range([height, 0]);

var xAxis  = d3.svg.axis().scale(xscale).orient("bottom");
var yAxis  = d3.svg.axis().scale(yscale).orient("left");

var svg = d3.select("#grid-1-1").append("svg")
						.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + selectorHeight);
        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (30) +","+(heightINI/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Million €");

var diagram = svg.append("g")
								 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

diagram.append("g")
  		 .attr("class", "x axis")
       .attr("transform", "translate(0, " + height + ")")
       .call(xAxis);

diagram.append("g")
       .attr("class", "y axis")
       .call(yAxis);

var bars = diagram.append("g")
        .attr("id", "principal");

bars.selectAll("rect")
            .data(data.slice(0, numBars), function (d) {return d.Country; })
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xscale(d.Country); })
            .attr("y", function (d) { return yscale(d['2006']); })
            .attr("width", xscale.rangeBand())
            .attr("height", function (d) { return height - yscale(d['2006']); })
            .attr("country",function (d) { return (d.Country); })
            .on("click",function(d) {console.log(d.Country)});

if (isScrollDisplayed)
{
  var xOverview = d3.scale.ordinal()
                  .domain(data.map(function (d) { return d.Country; }))
                  .rangeBands([0, width], .2);
  yOverview = d3.scale.linear().range([heightOverview, 0]);
  yOverview.domain(yscale.domain());

  var subBars = diagram.selectAll('.subBar')
      .data(data)

  subBars.enter().append("rect")
      .classed('subBar', true)
      .attr({
          height: function(d) {
              return heightOverview - yOverview(d['2006']);
          },
          width: function(d) {
              return xOverview.rangeBand()
          },
          x: function(d) {

              return xOverview(d.Country);
          },
          y: function(d) {
              return height + heightOverview + yOverview(d['2006'])
          }
      })

  var displayed = d3.scale.quantize()
              .domain([0, width])
              .range(d3.range(data.length));

  diagram.append("rect")
              .attr("transform", "translate(0, " + (height + margin.bottom) + ")")
              .attr("class", "mover")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", selectorHeight)
              .attr("width", Math.round(parseFloat(numBars * width)/data.length))
              .attr("pointer-events", "all")
              .attr("cursor", "ew-resize")
              .call(d3.behavior.drag().on("drag", display));
}
function display () {
    var x = parseInt(d3.select(this).attr("x")),
        nx = x + d3.event.dx,
        w = parseInt(d3.select(this).attr("width")),
        f, nf, new_data, rects;

    if ( nx < 0 || nx + w > width ) return;

    d3.select(this).attr("x", nx);

    f = displayed(x);
    nf = displayed(nx);

    if ( f === nf ) return;

    new_data = data.slice(nf, nf + numBars);

    xscale.domain(new_data.map(function (d) { return d.Country; }));
    diagram.select(".x.axis").call(xAxis);

    rects = bars.selectAll("rect")
      .data(new_data, function (d) {return d.Country; });

	 	rects.attr("x", function (d) { return xscale(d.Country); });

// 	  rects.attr("transform", function(d) { return "translate(" + xscale(d.label) + ",0)"; })

    rects.enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return xscale(d.Country); })
      .attr("y", function (d) { return yscale(d['2006']); })
      .attr("width", xscale.rangeBand())
      .attr("height", function (d) { return height - yscale(d['2006']); });

    rects.exit().remove();
};
})
}
func_barchar("profit_country_year.csv")
