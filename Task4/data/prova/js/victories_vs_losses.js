function victoriesvslosses(franch_seleccio){

  d3.csv("DataNBA1970.csv", function(d) {
    return {
      franchID : d.franchID,
      won: +d.won,
      lost: +d.lost,
      year: +d.year
    };

  },

  function load_victoriesvslosses (data){

    results = []
    for (i = 0; i < data.length; i++){
      if(franch_seleccio==data[i].franchID){
        results.push({year: data[i].year,
                        won: data[i].won,
                        lost: data[i].lost})
        }
    }

var margin = {
    top: 0,
    right: 100,
    bottom: 50,
    left: 0
},
width = 350 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width])

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right");

var svg = d3.select("#victoriesvslosses").append("svg")
    .attr("width", height + margin.top + margin.bottom)
    .attr("height", width + margin.left + margin.right)
    .append("g")
    .attr('transform','translate(288,20)rotate(-90,0,250)');

x.domain([-82,82])
y.domain(results.map(function (d) {
    return d.year;
}));

svg.selectAll(".victories")
    .data(results)
    .enter().append("rect")
    .attr("class", "victories")
    .attr("x", function (d) {
    return x(Math.min(0, d.won));
})
    .attr("y", function (d) {
    return y(d.year);
})
    .attr("width", function (d) {
    return Math.abs(x(d.won) - x(0));
})
    .attr("height", y.rangeBand());

svg.selectAll(".losses")
    .data(results)
    .enter().append("rect")
    .attr("class", "losses")
    .attr("x", function (d) {
    return x(Math.min(0, -d.lost));
})
    .attr("y", function (d) {
    return y(d.year);
})
    .attr("width", function (d) {
    return Math.abs(x(-d.lost) - x(0));
})
    .attr("height", y.rangeBand());


svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

svg.append("g")
    .attr("class", "y_axis")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(-15,20)rotate(90)");

function type(d) {
    d.won = +d.won;
    return d;
}
  }


)
}
