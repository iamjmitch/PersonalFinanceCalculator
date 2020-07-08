function drawPieChart() {
  var data = google.visualization.arrayToDataTable([
    ["Expense", "Cost"],
    ["Food", food],
    ["Rent/Mortgage", rent],
    ["Bills", bills],
    ["Spending Money", spending],
    ["Un-Allowcated", unallowcated],
  ]);

  var options = {
    title: "",
    backgroundColor: "transparent",
    legend: {
      position: "none"
    },
  };

  var chart = new google.visualization.PieChart(document.getElementById("piechart"));

  chart.draw(data, options);

  //update graph text
  breakdownBills.innerHTML = `<b>Bills:</b> $${decimals(bills, 2)} `;
  breakdownFood.innerHTML = `<b>Food:</b> $${decimals(food, 2)} `;
  breakdownRent.innerHTML = `<b>Rent/Mortgage:</b> $${decimals(rent, 2)} `;
  breakdownSpending.innerHTML = `<b>Spending Money:</b> $${decimals(spending, 2)} `;
  breakdownUnallow.innerHTML = `<b>Un-Allowcated:</b> $${decimals(unallowcated, 2)} `;

}