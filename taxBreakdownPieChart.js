function drawTaxPieChart() {
    var data = google.visualization.arrayToDataTable([
        ["Category", "Dollar"],
        ["Tax", parseInt(decimals(tax, 0))],
        ["Net Pay", parseInt(decimals(net, 0))],
        //graph doesn't generate properly without parseInt
    ]);

    var options = {
        title: "",
        backgroundColor: "transparent",
        legend: {
            position: "none"
        },
    };

    var chart = new google.visualization.PieChart(document.getElementById("taxPiechart"));
    chart.draw(data, options);

    //update graph text
    taxPieTextTax.innerHTML = `<b>Tax:</b> $${decimals(tax, 0)} `;
    taxPieTextNet.innerHTML = `<b>Net Pay:</b> $${decimals(net, 0)}`;
    taxPieTextAnnual.innerHTML = `<b>Annual Salary:</b> $${decimals(finances.annualIncome, 0)}`;
}
1