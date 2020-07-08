function drawLineChart() {
    var data = google.visualization.arrayToDataTable([
        ["Year", `Savings @ $${finances.weeklyContribution} Per Week`],
        ["Now", finances.currentSavings],
        ["6 Months ", finances.sixMonth],
        ["1 Year", finances.oneYear],
        ["5 Years", finances.fiveYear],
        ["10 Years", finances.tenYear],
        ["20 Years", finances.twentyYear],
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