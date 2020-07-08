function drawLineChart() {
    var data = google.visualization.arrayToDataTable([
      ["Year", `Savings @ $${regCont} Per Week`],
      ["Now", currentSavings],
      ["6 Months ", sixMonth],
      ["1 Year", oneYear],
      ["5 Years", fiveYear],
      ["10 Years", tenYear],
      ["20 Years", twentyYear],
    ]);
  
    var options = {
      title: "",
      pointSize: 7,
      pointShape: "circle",
      colors: ["#ff7a64", "#ff7a64"],
      vAxis: {
        format: "$#,###"
      },
      legend: {
        position: "bottom"
      },
      backgroundColor: "transparent",
    };
  
    var chart = new google.visualization.LineChart(document.getElementById("curve_chart"));
  
    chart.draw(data, options);
  }