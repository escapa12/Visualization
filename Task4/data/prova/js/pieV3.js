function piefunction (franch_seleccio){


d3.csv("DataNBA1970.csv", function(d) {
  return {
    franchID : d.franchID,
    o_fgm: +d.o_fgm,
    o_fga: +d.o_fga
    // o_3pm:+d.o_3pm,
    // o_3pa: +d.o_3pa,
    // o_ftm: +d.o_ftm,
    // o_fta: +d.fta
};
},
function (data) {

 for (i = 0; i < 30; i++){
    if(franch_seleccio==data[i].franchID){
        franch=i;
    }
}

// console.log(franch_seleccio)
// console.log(Nfranch)
var dades = [
{	"label": "% Field goal made",
  "value": data[franch].o_fgm/(data[franch].o_fga)*100,
},

{
  "label": "% Field Goal missed",
  "value": 100-(data[franch].o_fgm/data[franch].o_fga*100)
}
]


var w = 200;
var h = 200;
var r = h/2;
var aColor = ["#3ADF00","#FF0000"]


var vis = d3.select('#chart').append("svg:svg").data([dades]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

var pie = d3.layout.pie().value(function(d){return d.value;});

// Declare an arc generator function
var arc = d3.svg.arc().outerRadius(r).innerRadius(r/1.75);

// Select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){return aColor[i];})
    .attr("d", function (d) {return arc(d);})
    .on("mouseover",mousein)
    .on("mouseout",mouseout)
;

var total= 0
for (i =0; i<2;i++){total = total + dades[i].value }
// Add the text
arcs.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100; /* Distance of label to the center*/
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}
    )
    // .attr("text-anchor", "middle")
    // .text( function(d, i) {return Math.round(dades[i].value/total*100) + '%';});

vis.append("text").attr("id","pie_centre").text(franch_seleccio).style("font-size", 13).attr("transform","translate(-20,0)");
function mousein(d){

  console.log(d);
vis.select("#pie_centre").text(d.data.label+": "+String(Math.round(d.value/total*10000)/100+"%")).attr("transform","translate(-40,0)");
}
function mouseout(d){
vis.select("#pie_centre").text(franch_seleccio).attr("transform","translate(-20,0)") ;

}
var vis2 = d3.select('#chart').append("svg:svg").attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");



var legendG = vis2.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
  .data(pie(dades))
  .enter().append("g")
  .attr("transform", function(d,i){
    return "translate(" + (-60) + "," + (i * 20 -60) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
  .attr("class", "legend");

legendG.append("rect") // make a matching color rect
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function(d, i) {
    console.log(aColor[i])
    return aColor[i];
  });

legendG.append("text") // add the text
  .text(function(d){
    return  " " +" "+ d.data.label;
  })
  .style("font-size", 14)
  .attr("y", 10)
  .attr("x", 11);

legendG.append("text") // add the text
  .text(function(d){
    return "("+Math.round(d.data.value/total*10000)/100+"%)";
  })
  .style("font-size", 14)
  .attr("y", 10)
  .attr("x", 65);
});
}
