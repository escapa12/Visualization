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
    top: 30,
    right: 10,
    bottom: 10,
    left: 10
},
width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width])

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var svg = d3.select("#victoriesvslosses").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('transform','translate(300,240)rotate(-90,0,250)');

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
    .attr("class", "y axis")
    .append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y2", height);


function type(d) {
    d.won = +d.won;
    return d;
}
  }


)
}
