function radar (franch_seleccio){

d3.csv("DataNBA1970.csv", function(d) {
  return {
    franchID : d.franchID,
    o_reb: +d.o_reb,
    o_asts: +d.o_asts,
    o_pf: +d.o_pf,
    o_stl: +d.o_stl,
    o_to: +d.o_to,
    d_reb: +d.d_reb,
    d_asts: +d.d_asts,
    d_pf: +d.d_pf,
    d_stl: +d.d_stl,
    d_to: +d.d_to,
    d_blk: +d.d_blk,
    games:+d.games
};
},
function (data) {
    for (i = 0; i <= 30; i++){
	     if(franch_seleccio==data[i].franchID){
			      franch=i;

	 }
 }

var d = [
		  [
			{axis:"Rebounds",value:data[franch].o_reb/(data[franch].games)},
			{axis:"Assists",value:data[franch].o_asts/(data[franch].games)},
			{axis:"Personal Fouls",value: data[franch].o_pf/(data[franch].games)},
      {axis:"Steals",value: data[franch].o_stl/(data[franch].games)},
      {axis:"Turnovers",value: data[franch].o_to/(data[franch].games)}
		  ],[
        {axis:"Rebounds",value:data[franch].d_reb/(data[franch].games)},
  			{axis:"Assists",value:data[franch].d_asts/(data[franch].games)},
  			{axis:"Personal Fouls",value: data[franch].d_pf/(data[franch].games)},
        {axis:"Steals",value: data[franch].d_stl/(data[franch].games)},
        {axis:"Turnovers",value: data[franch].d_to/(data[franch].games)}
		  ]
		];

var w = 300,h = 300;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Selected Team','Opponents'];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 50,
  levels: 5,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#chart-radar')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,70)')
	.attr("x", w - 70)
	.attr("y", 0)
	.attr("font-size", "16px")
	.attr("fill", "#404040")
	.text("Team average stadistics by");

//Initiate Legend
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,85)')
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 70)
	  .attr("y", function(d, i){ return i * 20-2;})
	  .attr("width", 12)
	  .attr("height", 12)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "15px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;
});
}
