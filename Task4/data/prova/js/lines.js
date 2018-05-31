function plot_lines(){

d3.json("home_away.json", function(data) {
  sub_data = []
  for (i in data) {
    if (data[i].name.indexOf(current_franch) != -1) {
      sub_data.push(data[i])
    };
    // console.log(data[i]);
  }
  lc = new LineChart({
    parent: '#multiple',
    all_series: sub_data,
    x_axis_text: "Year",
    y_axis_text: "Matches"
  });
  lc.plot();
})
}
