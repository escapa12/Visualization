function create_copa(franch_seleccio){

  d3.csv("../NumberChampionships.csv", function(d) {
    return {
      franchID : d.franchID,
      won: d.winners,
    };

    for (i = 0; i < data.length; i++){
      if(franch_seleccio==data[i].franchID){
        return {
          win_copes : data[i].won}
        }
    }
    console.log('holaaaa');
    var para = document.createElement("p");
    var node = document.createTextNode(won);
    para.appendChild(node);

    var element = document.getElementById("copa");
    element.appendChild(para);
    // d3.select("#copa").append("p").text(won)
  }) }
