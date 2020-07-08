function drawTaxPieChart() {
    var data = google.visualization.arrayToDataTable([
      ["Category", "Dollar"],
      ["Tax", taxHelper],
      ["Net Pay", netHelper],
    ]);
  
    var options = {
      title: "",
      backgroundColor: "transparent",
      legend: {
        position: "none"
      },
    };
  
    var chart = new google.visualization.PieChart(document.getElementById("taxPiechart"));
    //   var a = parseFloat(taxHelper.toFixed(2)).toLocaleString();
    //   var b = parseFloat(netHelper.toFixed(2)).toLocaleString();
    chart.draw(data, options);
    taxPieTextTax.innerHTML = `<b>Tax:</b> $${parseFloat(taxHelper.toFixed(2)).toLocaleString()} `;
    taxPieTextNet.innerHTML = `<b>Net Pay:</b> $${parseFloat(netHelper.toFixed(2)).toLocaleString()}`;
    taxPieTextAnnual.innerHTML = `<b>Annual Salary:</b> $${parseFloat((income * 52).toFixed(2)).toLocaleString()}`;
  }