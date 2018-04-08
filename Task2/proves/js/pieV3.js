function piefunction (Npais){


d3.csv("order_country_year.csv", function(d) {
  return {
    state : d.state,
    telephone: +d.Telephone,
    visit: +d["Sales visit"],
    special:+d.Special,
    mail: +d.Mail,
    email: +d["E-mail"],
    fax: +d.Fax,
    web:+d.Web
};
},
function (data) {
  /*console.log(pais);
 var Npais=21; // 21= World
 for (i = 0; i < 21; i++){
    if(pais==data[i].state){
        Npais=i;
    }
}*/

// var Npais=21;
var dades = [
{	"label": "Telephone",
  "value": data[Npais].telephone
},

{
  "label": "Sales visit",
  "value": data[Npais].visit
},
{
  "label": "Special",
  "value": data[Npais].special
},
{
  "label": "Mail",
  "value": data[Npais].mail
},
{
  "label": "E-mail",
  "value": data[Npais].email
},
{
  "label": "Web",
  "value": data[Npais].web
},
{
  "label": "Fax",
  "value": data[Npais].fax
}
]
console.log(dades);

var w = 400;
var h = 400;
var r = h/2;
var aColor = ["#2383c1","#64a61f","#7b6788","#a05c56","#961919","#e98125","#d8d239"]


var vis = d3.select('#chart').append("svg:svg").data([dades]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

var pie = d3.layout.pie().value(function(d){return d.value;});

// Declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// Select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){return aColor[i];})
    .attr("d", function (d) {return arc(d);})
;

var total= 0
for (i =0; i<7;i++){total = total + dades[i].value }
// Add the text
arcs.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100; /* Distance of label to the center*/
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {return Math.round(dades[i].value/total*100) + '%';});


var vis2 = d3.select('#chart').append("svg:svg").attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");


var legendG = vis2.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
  .data(pie(dades))
  .enter().append("g")
  .attr("transform", function(d,i){
    return "translate(" + (-160) + "," + (i * 20 -40) + ")"; // place each legend on the right and bump each one down 15 pixels
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
  .style("font-size", 12)
  .attr("y", 10)
  .attr("x", 11);


});
}
