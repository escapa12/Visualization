function piefunction (franch_seleccio){


d3.csv("DataNBA1970.csv", function(d) {
  return {
    franchID : d.franchID,
    o_fgm: +d.o_fgm,
    o_fga: +d.o_fga
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


var w = 120;
var h = 120;
var r = h/2;
var aColor = ["#1fa900","#bc2403"]


var vis = d3.select('#pie3').append("svg:svg").data([dades]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

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


  vis.append("text").attr("id","pie_centre").text("Field goals").style("font-size", 13).attr("transform","translate(-35,0)");
  function mousein(d){

  vis.select("#pie_centre").text(String(Math.round(d.value/total*10000)/100+"%")).style("font-size", 22).attr("transform","translate(-20,0)");
  }
  function mouseout(d){
  vis.select("#pie_centre").text("Field goal").attr("transform","translate(-35,0)") ;

  }

var vis2 = d3.select('#pie3').append("svg:svg").attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

});
}
