d3.json("revenue.json", function(data) {

  var ordinalScale = d3.scale.ordinal()
          .domain([2004,2005,2006,2007])
          .range(['a', 'b', 'c', 'd', 'e']);
  sub_data = data[0]
  lc = new LineChart({
    parent: '#multiple',
    all_series: [sub_data],
    x_axis_text: "year",
    y_axis_text: "euros (€)"
  });
  lc.plot();
})
