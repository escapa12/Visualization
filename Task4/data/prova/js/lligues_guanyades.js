function create_copa(franch_seleccio){
  d3.csv("../NumberChampionships.csv", function(d) {
    for (i = 0; i < d.length; i++){
      if(franch_seleccio==d[i].franchID){
        document.getElementById("copa_value").innerHTML = d[i].winners;
        }
    }
  })
}
