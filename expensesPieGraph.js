function drawPieChart() {
    var data = google.visualization.arrayToDataTable([
      ["Expense", "Cost"],
      ["Food", foodHelper],
      ["Rent/Mortgage", rentHelper],
      ["Bills", billsHelper],
      ["Spending Money", spendingHelper],
      ["Un-Allowcated", unallowHelper],
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
    breakdownBills.innerHTML = `<b>Bills:</b> $${parseFloat(billsHelper.toFixed(2)).toLocaleString()} `;
    breakdownFood.innerHTML = `<b>Food:</b> $${parseFloat(foodHelper.toFixed(2)).toLocaleString()} `;
    breakdownRent.innerHTML = `<b>Rent/Mortgage:</b> $${parseFloat(rentHelper.toFixed(2)).toLocaleString()} `;
    breakdownSpending.innerHTML = `<b>Spending Money:</b> $${parseFloat(spendingHelper.toFixed(2)).toLocaleString()} `;
    breakdownUnallow.innerHTML = `<b>Un-Allowcated:</b> $${parseFloat(unallowHelper.toFixed(2)).toLocaleString()} `;
  
  }