function plot_table(){
  var chart = document.getElementById("chart-stage");
  var width = chart.offsetWidth-10;
  var height = chart.offsetHeight-10;
var valueFunc = function(data) { return data.value; }
var textFunc = function(data) { return data.fullname; }
;

d3.json("product_benefit_country.json",function(testdata){
  var votesData=[]

  pais=current_country
  data=testdata[pais]
    Object.keys(data).forEach(function(key){
      test={};
      test.fullname=key;
      test.value=Math.round(+data[key]*1000)/1000;
      votesData.push(test)
    });
  console.log(votesData);
  var columns = ["Products ("+pais+')', "Benefit (M €)"]
drawTable(votesData, "#table", { width: width, height: height }, valueFunc, textFunc, columns);});
};

function plot_table2(){
  var chart = document.getElementById("chart-stage2");
  var width = chart.offsetWidth-10;
  var height = chart.offsetHeight-10;
var valueFunc = function(data) { return data.value; }
var textFunc = function(data) { return data.fullname; }
;

d3.json("product_line_country.json",function(testdata){
  var votesData=[]

  pais=current_country
  data=testdata[pais]
    Object.keys(data).forEach(function(key){
      test={};
      test.fullname=key;
      test.value=Math.round(+data[key]);
      votesData.push(test)
    });
  console.log(votesData);
  var columns = ["Product line ("+pais+')', "Number of products produced"]
drawTable(votesData, "#table2", { width: width, height: height }, valueFunc, textFunc, columns);});
}
